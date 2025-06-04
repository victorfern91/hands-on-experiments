import Button from "@/components/ui/button";
import { useEditorStore } from "@/store/editor.store";

export default function Editor() {
  const backgroundImage = useEditorStore((state) => state.background);

  if (!backgroundImage) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No background image set</p>
        <Button>Start the upload process wizard now</Button>
      </div>
    );
  }

  return <h1>Hello world</h1>;
}
