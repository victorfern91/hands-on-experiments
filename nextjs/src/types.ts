interface StreamMessage {
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}
