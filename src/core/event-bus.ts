type callback = (...args: unknown[]) => void;

export class EventBus {
  listeners: Indexed<callback[]> = {};
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: callback) {
    if (!this.listeners[event]) {
      throw new Error(`Event is not registered: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  deleteAllListeners() {
    this.listeners = {};
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
