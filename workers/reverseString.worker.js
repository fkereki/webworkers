const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  The code below illustrates the pattern for calls and returns:

  Worker code will be invoked with an object that includes a data attribute
  which will have the parameters for the call

  If the function succeeds, it must post a message with an object that includes
  a result attribute with the value to return

  If the function fails or crashes, it must post a message with an object that
  includes an error attribute with an appropriate error text
*/

self.onmessage = async ({ data }) => {
  await timeout(Math.ceil(Math.random() * 2000));
  if (typeof data === 'string') {
    self.postMessage({ result: data.split('').reverse().join('') });
  } else {
    self.postMessage({ error: 'Not a string ' + data });
  }
};
