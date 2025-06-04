import EditorEmptyState from "@/components/topo-builder/empty-state";
import TopoViewer from "@/components/topo-builder/topo-viewer";
import { useEditorStore } from "@/store/editor.store";

export default function Editor() {
  const backgroundImage = useEditorStore((state) => state.background);

  if (!backgroundImage) {
    return <EditorEmptyState />;
  }

  return (
    <div className="m-auto h-full w-full">
      <TopoViewer />
    </div>
  );
}
