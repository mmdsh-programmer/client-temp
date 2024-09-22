// eslint-disable-next-line no-restricted-globals
addEventListener("message", ({ data }) => {
    const warningTimeout = data - 20;
    if (typeof data === "number") {
      setTimeout(() => {
        postMessage(warningTimeout);
      }, warningTimeout * 1000); // post warning
      setTimeout(() => {
        postMessage(data);
      }, data * 1000); // post done
    }
  });
  
  export {};
  