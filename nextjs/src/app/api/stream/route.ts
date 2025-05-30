import {HttpStream} from "@/lib/server/http-stream";

export async function GET() {
  const stream = new HttpStream();

  const words = ['hello', 'victor', 'this', 'is', 'a', 'streamed', 'message'];

  (async() => {
    for (const word of words) {
      for (const char of  (` ${word}`).split('')) {
        stream.write('message', {content: char});
        await new Promise((r) => setTimeout(r, 50));
      }

      await new Promise((r) => setTimeout(r, 300));
    }

    stream.close();
  })();

  return new Response(stream.stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Transfer-Encoding': 'chunked', // 👈🏻 This is necessary for HTTP streaming
    },
  });
}