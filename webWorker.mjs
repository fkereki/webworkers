const workers = [];

const getWorker = (filename) => {
  const i = workers.findIndex((w) => w.filename === filename && w.free);
  if (i === -1) {
    workers.push({ filename, worker: new Worker(filename), free: true });
    return workers.length - 1;
  } else {
    return i;
  }
};

const createWorkerAndCall = async (filename, parameter) => {
  const i = getWorker(filename);

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
      getWorker(filename); /* preloading! */
      return (parameter) => createWorkerAndCall(filename, parameter);
    case 2:
      // if a worker doesn't receive parameters,
      // to avoid preloading call it with an undefined argument
      return createWorkerAndCall(filename, parameter);
    default:
      throw new Error('Wrong number of parameters for webCall(...)');
  }
};
