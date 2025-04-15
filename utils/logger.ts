import winston from "winston";

winston.addColors({
  error: "red bold",
  warn: "yellow underline",
  info: "green",
  debug: "cyan"
});


const logFormat = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { message } = info;
    // Remove newlines while preserving ANSI codes and spaces
    return `${message as string}`.replaceAll("\\\\\"", "\\\"");
  }),
);

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

export default Logger;
