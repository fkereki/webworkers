const worker = new Worker(getURL());
worker.onmessage = (evt) => console.log(evt.data);

function getURL() {
  const txt = '/* código de la función */';
  return URL.createObjectURL(new Blob([txt]));
}

/*
    La función tiene self.onmessage = (e) => { ... self.postMessage(resultados para e.data)}
*/
