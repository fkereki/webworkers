import { Worker } from 'worker_threads';
const worker = new Worker('./workers/sample_fib_worker.mjs');

console.log(new Date(), 'START');
worker.postMessage(40);
worker.postMessage(35);
worker.postMessage(45);
worker.postMessage(15);
console.log(new Date(), 'END');

worker.on('message', (msg) => {
  console.log(new Date(), 'MESSAGE', msg);
});

// Keep the process running by keeping the standard input stream open
process.stdin.resume();

// Handle Control-C (SIGINT) signal
process.on('SIGINT', () => {
  worker.terminate();
  process.exit();
});

// ChatGPT info:
// When you send several messages to a worker thread in Node.js, the messages are added to the worker's message queue and processed one by one
// in the order they are received. This ensures that each message is handled sequentially, allowing for predictable and organized processing of tasks.
//
// Message Order: Messages are processed in the order they are sent. If you send multiple messages in quick succession, they will be queued and
// handled sequentially by the worker thread.
//
// Thread Communication: Worker threads communicate with the main thread using the postMessage method and the message event listener.
//
// Concurrency: While worker threads run concurrently with the main thread, they handle messages one at a time. If you need to perform multiple
// tasks in parallel, you can create multiple worker threads.
//
// Error Handling: Always handle potential errors that may occur in the worker thread using the error event.
