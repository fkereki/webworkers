import { Worker } from 'worker_threads';

const pool = [];

export const callWorker = (filename, value) => {
  let available = pool.filter((v) => !v.inUse).find((x) => x.filename === filename);
  if (available === undefined) {
    available = {
      worker: new Worker(filename),
      filename,
      inUse: true
    };
    pool.push(available);
  }

  return new Promise((resolve, reject) => {
    available.inUse = true;
    available.worker.on('message', (x) => {
      resolve(x);
      available.inUse = false;
    });
    available.worker.on('error', (x) => {
      reject(x);
      available.inUse = false;
    });
    available.worker.postMessage(value);
  });
};
