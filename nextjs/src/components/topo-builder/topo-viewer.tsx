import TopoSVG from "@/components/topo-builder/topo-svg";
import useShortcuts from "@/components/topo-builder/use-shortcuts";
import { useEditorStore } from "@/store/editor.store";
import { useShallow } from "zustand/react/shallow";

export default function TopoViewer() {
  const [zoomIn, zoomOut] = useEditorStore(
    useShallow((state) => [state.zoomIn, state.zoomOut]),
  );

  useShortcuts();

  return (
    <div className="h-full w-full">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="rounded bg-white p-2 shadow hover:bg-gray-100"
        >
          ➕
        </button>
        <button
          onClick={zoomOut}
          className="rounded bg-white p-2 shadow hover:bg-gray-100"
        >
          ➖
        </button>
      </div>

      <TopoSVG />
    </div>
  );
}
