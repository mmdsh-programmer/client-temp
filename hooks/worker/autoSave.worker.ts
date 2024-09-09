let interval: any;
self.onmessage = function (e) {
  const workerData = e.data;
  if (interval) {
    clearInterval(interval);
  } else if (workerData.action === "START") {
    interval = setInterval(() => {
      self.postMessage(["WORKER_SAVE_DATA"]);
    }, workerData.time * 1000);
  } else if (workerData.action === "STOP") {
    clearInterval(interval);
    self.postMessage(["INTERVAL_CLEARED"]);
  }
};
export {};
