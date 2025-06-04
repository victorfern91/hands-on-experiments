/**
 * HttpStream is a utility class for creating a readable stream that can be used
 * to streaming data over HTTP. This is something that is useful to avoid implementing
 * all the structure of the stream in each route handler.
 *
 * @author Victor Fernandes <victorfern91@gmail.com>
 */
export class HttpStream {
  private encoder = new TextEncoder();
  private controller?: ReadableStreamDefaultController;
  public stream: ReadableStream;

  constructor() {
    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
      },
    });
  }

  write(event: string, data: Record<string, unknown>) {
    if (!this.controller) {
      throw new Error("Stream not ready");
    }
    this.controller.enqueue(
      this.encoder.encode(
        JSON.stringify({ event, data, timestamp: Date.now() }) + "\n",
      ),
    );
  }

  close() {
    this.controller?.close();
  }
}
