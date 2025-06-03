"use client";

import Button from "@/components/ui/button";
import useHttpStream from "@/lib/client/hooks/use-http-stream";
import {useState} from "react";

export default function Page() {
  const [enabled, setEnabled] = useState(false);

  const { messages, isLoading } = useHttpStream<>({
    url: '/api/stream',
    options: {
      onMessage: ({ data}) => {
        console.log('Received message:', data);
      },
      onError: (error) => {
        console.error('Error in stream:', error);
      },
      enabled: enabled,
    },
  });

  console.log(isLoading);

  return (
    <main className="w-full h-full bg-gray-700 text-white p-24">
      <div className="bg-gray-600 p-4 rounded-lg shadow-xs mb-8 w-fit max-w-96 ml-auto">
        <p className="mb-4">I have something for you! If you want to be please trigger an action</p>
        <Button onClick={() => setEnabled(true)} disabled={isLoading}>
          Execute Action
        </Button>
      </div>
      <h1>Welcome to the Next.js App</h1>
      <p>This is a simple page using MDX in a Next.js application.</p>
    </main>
  );
}