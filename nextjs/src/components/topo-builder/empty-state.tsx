import { getImageDimesions } from "@/lib/utils";
import { useEditorStore } from "@/store/editor.store";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export default function EditorEmptyState() {
  const [setBackgroundImage, setDimensions] = useEditorStore(
    useShallow((state) => [state.setBackgroundImage, state.setDimensions]),
  );
  const handleImageUpload = async function (evt) {
    const file = evt.target.files[0];

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const { width, height } = await getImageDimesions(blobUrl);

      setDimensions(width, height);
      setBackgroundImage(blobUrl);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-gray-500">No background image set</p>
      <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
      </button>
    </div>
  );
}
