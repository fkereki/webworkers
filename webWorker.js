const workers = [];

const createWorkerAndCall = async (filename, parameter) => {
  let i = workers.findIndex((w) => w.filename === filename && w.free);
  if (i === -1) {
    i = workers.length;
    workers.push({ filename, worker: new Worker(filename) });
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
  if (arguments.length === 0 || arguments.length > 2) {
    throw new Error('Wrong number of parameters for webCall(...)');
  } else {
    return arguments.length === 2
      ? createWorkerAndCall(filename, parameter)
      : (parameter) => createWorkerAndCall(filename, parameter);
  }
};
