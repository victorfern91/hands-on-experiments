import { useEditorStore } from "@/store/editor.store";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function useShortcuts() {
  const [zoomIn, zoomOut, setMode] = useEditorStore(
    useShallow((state) => [state.zoomIn, state.zoomOut, state.setMode]),
  );

  const handleEvents = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMode("viewer");
    } else if (event.key === "+" && event.metaKey) {
      zoomIn();
    } else if (event.key === "-" && event.metaKey) {
      zoomOut();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEvents);

    return () => {
      document.removeEventListener("keydown", handleEvents);
    };
  }, []);
}
