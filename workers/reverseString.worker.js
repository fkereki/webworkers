const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

self.onmessage = async ({ data }) => {
  await timeout(Math.ceil(Math.random() * 2000));
  if (typeof data === 'string') {
    self.postMessage({ result: data.split('').reverse().join('') });
  } else {
    self.postMessage({ error: 'Not a string ' + data });
  }
};
