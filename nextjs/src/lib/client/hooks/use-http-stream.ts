"use client";

import { useEffect, useState } from "react";

interface UseHttpStreamOptions {
  url: string;
  options: {
    onMessage: (message: StreamMessage) => void;
    onError?: (error: Error) => void;
    enabled?: boolean;
  };
}

export default function useHttpStream({
  url,
  options = { enabled: false },
}: UseHttpStreamOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function fetchStream() {
    try {
      setIsLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        setIsError(true);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });

        // Split by newlines in case multiple chunks arrive at once
        for (const line of textChunk.trim().split("\n")) {
          options.onMessage(JSON.parse(line) as StreamMessage);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      options.onError?.(error as Error);
    }
  }

  useEffect(() => {
    if (options.enabled) {
      void fetchStream();
    }
  }, [options.enabled]);

  return {
    isLoading,
    isError,
    messages: [],
  };
}
