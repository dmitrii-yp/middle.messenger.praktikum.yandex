type callback = (...args: string[]) => void;

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

  emit(event: string, ...args: string[]) {
    if (!this.listeners[event]) {
      throw new Error(`Event is not registered: ${event}`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}


