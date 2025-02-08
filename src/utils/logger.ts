// utils/logger.js
export const logger = {
  log: (...args: any) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      console.log(...args);
    }
  },
  warn: (...args: any) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      console.warn(...args);
    }
  },
  error: (...args: any) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      console.error(...args);
    }
  },
};
