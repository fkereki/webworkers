import { webCall } from './webWorker.js';

webCall('workers/fibonacci.worker.js', 42).then((v) => console.log('FIBO', v));

['LONE', 'RANGER', 9, 22, true].forEach((v) => {
  webCall('workers/reverseString.worker.js', v)
    .then((x) => console.log('SUCCESS #1', x))
    .catch((e) => console.log('ERROR #1', e));
});

setTimeout(() => {
  webCall('workers/reverseString.worker.js', 'HOPALONG')
    .then((x) => console.log('SUCCESS #2', x))
    .catch((e) => console.log('ERROR #2', e));
  webCall('workers/reverseString.worker.js', 'CASSIDY')
    .then((x) => console.log('SUCCESS #3', x))
    .catch((e) => console.log('ERROR #3', e));
}, 5000);

const wc = webCall('workers/reverseString.worker.js');

console.log(await wc('GENE AUTRY'));
console.log(await wc('RED RYDER'));
console.log(await wc('RAWHIDE KID'));

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
