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
