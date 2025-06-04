import { useEditorStore } from "@/store/editor.store";
import React, { useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { line, curveCardinal } from "d3-shape";

export default function TopoSVG() {
  const [blob = "", width, height, scale] = useEditorStore(
    useShallow((state) => [
      state.background,
      state.width,
      state.height,
      state.scale,
    ]),
  );

  const [points, setPoints] = useState([]);
  const svgRef = useRef(null);

  const handleSvgClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    console.log(`Clicked at: (${x}, ${y})`, points);
    setPoints([...points, { x, y }]);
  };

  const lineGenerator = line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveCardinal.tension(0.25));

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200"
      onClick={handleSvgClick}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <image width={width} height={height} href={blob} />

      <circle
        cx={Math.round(points.at(0)?.x)}
        cy={Math.round(points.at(0)?.y)}
        r={4.5}
        stroke="#1E472A"
        fill="#639524"
      />
      <circle
        cx={Math.round(points.at(-1)?.x)}
        cy={Math.round(points.at(-1)?.y)}
        r={4.5}
        stroke="#1E472A"
        fill="#639524"
      />
      <path
        d={lineGenerator(points)}
        stroke="#1e472a"
        fill="none"
        strokeWidth={10}
      />
      <path
        d={lineGenerator(points)}
        stroke="#639524"
        fill="none"
        strokeWidth={8}
      />
      {/*points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={8}
          fill="rgba(255, 255, 255, 0.5)"
        />
      ))*/}
    </svg>
  );
}
