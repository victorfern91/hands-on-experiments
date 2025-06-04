"use client";

import Editor from "@/components/topo-builder/editor";
import Button from "@/components/ui/button";
import { EditorStoreProvider } from "@/store/editor.store";

export default function Page() {
  return (
    <EditorStoreProvider>
      <main className="w-full h-full bg-gray-100/80 flex p-4">
        <section className="h-full pr-4" data-test="side-nav">
        </section>
        <section
          className="rounded-md h-full w-full shadow-sm bg-white overflow-auto"
          data-test="topo-editor"
        >
          <Editor />
        </section>
      </main>
    </EditorStoreProvider>
  );
}
