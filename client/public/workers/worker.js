/* eslint-disable */
self.onmessage = (e) => {
  const { data } = e;
  self.postMessage(data);
};
