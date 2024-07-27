import { parentPort } from 'worker_threads';

const fibonacci = (i) => (i < 2 ? i : fibonacci(i - 1) + fibonacci(i - 2));

function fakeWorker(n) {
  console.log(new Date(), 'BEGIN WORKER', n, typeof n);
  const result = fibonacci(n);
  console.log(new Date(), 'END WORKER', n);
  parentPort.postMessage(`WORKER fib(${n})=${result}`);
}

parentPort.on('message', fakeWorker);
