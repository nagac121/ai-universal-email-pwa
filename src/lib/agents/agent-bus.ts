// Simple Pub/Sub bus for inter‑agent communication
// Agents subscribe to a topic and can publish events.
// This implementation is intentionally lightweight for the mock environment.

type Callback = (payload: unknown) => void;

type Topic = string;

class AgentBus {
  private listeners: Record<Topic, Callback[]> = {};

  subscribe(topic: Topic, cb: Callback) {
    if (!this.listeners[topic]) this.listeners[topic] = [];
    this.listeners[topic].push(cb);
    // return unsubscribe function
    return () => {
      this.listeners[topic] = this.listeners[topic].filter(fn => fn !== cb);
    };
  }

  publish(topic: Topic, payload: unknown) {
    const cbs = this.listeners[topic] || [];
    cbs.forEach(cb => {
      try {
        cb(payload);
      } catch (e) {
        console.error(`AgentBus error on topic ${topic}:`, e);
      }
    });
  }
}

export const agentBus = new AgentBus();
