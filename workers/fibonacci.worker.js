const fibonacci = (i) => (i < 2 ? i : fibonacci(i - 1) + fibonacci(i - 2));

self.onmessage = async ({ data }) =>
  self.postMessage({ result: fibonacci(data) });
