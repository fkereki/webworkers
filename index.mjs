import { webCall } from './webWorker.js';

const FIBONACCI = 'workers/fibonacci.worker.js';
const REVERSE_STRING = 'workers/reverseString.worker.js';

const logSuccess = (i) => (v) => console.log('SUCCESS #' + i, v);
const logFailure = (i) => (v) => console.log('FAILURE #' + i, v);

(async () => {
  webCall(FIBONACCI, 42).then(logSuccess('FIBO'));

  ['LONE', 'RANGER', 9, 22, true].forEach((v) => {
    webCall(REVERSE_STRING, v).then(logSuccess(1)).catch(logFailure(1));
  });

  setTimeout(() => {
    webCall(REVERSE_STRING, 'HOPALONG').then(logSuccess(2)).catch(logFailure(2));
    webCall(REVERSE_STRING, 'CASSIDY').then(logSuccess(3)).catch(logFailure(3));
  }, 5000);

  const wc = webCall(REVERSE_STRING);

  console.log(await wc('GENE AUTRY'));
  console.log(await wc('RED RYDER'));
  console.log(await wc('RAWHIDE KID'));
})();

/* Sample output at console

index.js:7  SUCCESS #1 ENOL
index.js:8  ERROR #1 Not a string true
index.js:8  ERROR #1 Not a string 22
index.js:7  SUCCESS #1 REGNAR
index.js:8  ERROR #1 Not a string 9
index.js:22 YRTUA ENEG
index.js:23 REDYR DER
index.js:24 DIK EDIHWAR
index.js:3  FIBO 267914296
index.js:16 SUCCESS #3 YDISSAC
index.js:13 SUCCESS #2 GNOLAPOH

*/
