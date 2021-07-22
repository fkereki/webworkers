const workers = [];

const addWorker = (filename) => {
  workers.push({ filename, worker: new Worker(filename), free: true });
};

const createWorkerAndCall = async (filename, parameter) => {
  let i = workers.findIndex((w) => w.filename === filename && w.free);
  if (i === -1) {
    addWorker(filename);
    i = workers.length - 1;
  }

  return new Promise((resolve, reject) => {
    workers[i].worker.onmessage = ({ data }) => {
      workers[i].free = true;
      data.error ? reject(data.error) : resolve(data.result);
    };
    workers[i].free = false;
    workers[i].worker.postMessage(parameter);
  });
};

export const webCall = function (filename, parameter) {
  switch (arguments.length) {
    case 1:
      addWorker(filename);
      return (parameter) => createWorkerAndCall(filename, parameter);
    case 2:
      return createWorkerAndCall(filename, parameter);
    default:
      throw new Error('Wrong number of parameters for webCall(...)');
  }
};
