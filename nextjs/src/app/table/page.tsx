"use client";
import React, { useState, useMemo, useRef } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

const EditableTable = ({ data, columns }) => {
  const [tableData, setTableData] = useState(data);
  const [editingCell, setEditingCell] = useState(null);
  const tableContainerRef = useRef(null);

  const updateData = (rowIndex, columnId, value) => {
    setTableData((old) => {
      const newData = [...old];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnId]: value,
      };
      return newData;
    });
  };

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 35,
    overscan: 10,
  });

  return (
    <div className="h-full overflow-auto" ref={tableContainerRef}>
      <table className="table-auto border-collapse w-full">
        <thead className="sticky top-0 bg-white z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border p-2 text-left bg-white"
                style={{ width: header.column.getSize() }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody style={{ height: rowVirtualizer.getTotalSize() + "px", position: "relative" }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          return (
            <tr
              key={row.id}
              style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${virtualRow.start}px)`,
                width: "100%",
                display: "table",
                tableLayout: "fixed",
              }}
            >
              {row.getVisibleCells().map((cell) => {
                const isEditing =
                  editingCell?.rowIndex === row.index &&
                  editingCell?.columnId === cell.column.id;

                return (
                  <td
                    key={cell.id}
                    className="border p-2"
                    onDoubleClick={() => setEditingCell({ rowIndex: row.index, columnId: cell.column.id })}
                  >
                    {isEditing ? (
                      <input
                        className="w-full border"
                        autoFocus
                        defaultValue={cell.getValue()}
                        onBlur={(e) => {
                          updateData(row.index, cell.column.id, e.target.value);
                          setEditingCell(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Escape") {
                            e.target.blur();
                          }
                        }}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

// Example usage
export default function Page (){
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor("salary", {
        header: "Salary",
        cell: (info) => parseFloat(info.getValue()).toFixed(2),
        size: 100,
      }),
    ],
    []
  );

  const data = useMemo(
    () =>
      Array.from({ length: 10000 }, (_, i) => ({
        name: `Person ${i + 1}`,
        role: `Role ${i % 5}`,
        salary: (Math.random() * 100000).toFixed(2),
      })),
    []
  );

  return <EditableTable data={data} columns={columns} />;
};