import { parentPort } from 'worker_threads';

const resolveAfterSeconds = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

async function fakeWorker(n) {
  console.log(new Date(), 'BEGIN WORKER', n);
  await resolveAfterSeconds(n);
  console.log(new Date(), 'END WORKER', n);
  parentPort.postMessage(`WORKER ${n}`);
}

parentPort.on('message', fakeWorker);
