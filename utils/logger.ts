import winston from "winston";

winston.addColors({
  error: "red bold",
  warn: "yellow underline",
  info: "green",
  debug: "cyan"
});

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

export default Logger;
