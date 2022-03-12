import { createLogger, format, Logger, transports } from "winston";

/** A function that will compose a new logger instance, some are provided already */
export const composeLogger = (): Logger =>
  createLogger({
    level: "info",
    format: format.json(),
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
    ],
  });

export const userLogger = composeLogger();
export const productLogger = composeLogger();
export const locationLogger = composeLogger();
export const pushLogger = composeLogger();
