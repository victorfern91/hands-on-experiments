import { HttpStream } from "@/lib/server/http-stream";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateLongComputation(stream) {
  stream.write("agent", {
    id: "search-agent",
    message: "Starting looking flights from OPO to LAX ??️",
    loading: true,
    timestamp: new Date().toISOString(),
  });
  await delay(2000);
  stream.write("agent", {
    id: "search-agent",
    message: "Found 3 flights",
    loading: false,
    timestamp: new Date().toISOString(),
  });

  stream.close();
}

export async function GET() {
  const stream = new HttpStream();

  void simulateLongComputation(stream);

  return new Response(stream.stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Transfer-Encoding": "chunked", // 👈🏻 This is necessary for HTTP streaming
    },
  });
}
