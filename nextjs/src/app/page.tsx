'use client';
import useHttpStream from "@/lib/client/hooks/use-http-stream";

export default function Home() {
  const { messages } = useHttpStream('/api/stream')



  return (
    <main className="p-6">
      <div className="mt-4 bg-gray-100 p-4 rounded min-h-[80px] whitespace-pre-wrap">
        {messages}
      </div>
    </main>
  );
}