/* eslint-disable @typescript-eslint/no-explicit-any */
const Logger = {
  info: (...args: any[]) => {
    console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
  warn: (...args: any[]) => {
    console.warn(...args);
  },
  debug: (...args: any[]) => {
    console.debug(...args);
  },
};

export default Logger;
