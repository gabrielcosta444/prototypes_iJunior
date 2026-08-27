import '@testing-library/jest-dom/vitest';

class TestResizeObserver implements ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  disconnect() {}
  observe(target: Element) {
    this.callback([{ target, contentRect: { width: 900, height: 300 } } as ResizeObserverEntry], this);
  }
  unobserve() {}
}

globalThis.ResizeObserver = TestResizeObserver;
