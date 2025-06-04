"use client";

import React, { useRef, useState } from "react";

export default function ClimbingRouteDrawer() {
  const [points, setPoints] = useState([]);
  const [image, setImage] = useState(null);
  const svgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleSvgClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const handleReset = () => setPoints([]);

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {image && (
        <div className="relative">
          <img src={image} alt="Climbing wall" className="w-full max-w-2xl" />
          <svg
            ref={svgRef}
            onClick={handleSvgClick}
            className="absolute top-0 left-0 w-full h-full pointer-events-auto"
          >
            {points.map((point, index) => (
              <circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
            ))}
            {points.length > 1 &&
              points.slice(1).map((point, i) => {
                const prev = points[i];
                return (
                  <line
                    key={i}
                    x1={prev.x}
                    y1={prev.y}
                    x2={point.x}
                    y2={point.y}
                    stroke="red"
                    strokeWidth="2"
                  />
                );
              })}
          </svg>
        </div>
      )}
      {points.length > 0 && (
        <button
          onClick={handleReset}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Limpar Rotas
        </button>
      )}
    </div>
  );
}
