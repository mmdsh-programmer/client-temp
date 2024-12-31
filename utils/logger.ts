import winston from "winston";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { message } = info;
    return typeof message === "string" ? message : JSON.stringify(message);
  }),
);

const Logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

export default Logger;
