'use client';

import {useEffect, useState} from "react";


export default function useHttpStream(url: string /*, onMessage: (message: string) => void */) {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    async function fetchStream() {
     const response = await fetch(url);


      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });

        // Split by newlines in case multiple chunks arrive at once
        for (const line of textChunk.trim().split('\n')) {
          try {
            const parsed = JSON.parse(line);
            setMessages(prev => prev + parsed.content);
          } catch (err) {
            console.error('Error parsing JSON chunk', err);
          }
        }
      }

    }

    void fetchStream();
  }, []);

  return {
    messages,
  }
}