"use client";

import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="font-bold text-xl mb-4" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 mb-4" {...props} />,
  li: (props) => <li className="" {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 hover:text-blue-700 hover:underline"
      {...props}
    />
  ),
};

export default function MDXClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
