"use client";

import MDXClientProvider from "@/components/mdx-client-provider";
import Content from "./content.mdx";

export default function Page() {
  return (
    <main className="m-12">
      <MDXClientProvider>
        <Content />
      </MDXClientProvider>
    </main>
  );
}
