import winston from "winston";
import config from '../config/config.js';


let logger 
switch (config.mode) {
  case 'DEVELOPMENT':
    logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.Console({
          level: "http",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.Console({
          level: "info",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          filename: "./errors.log",
          level: "warn",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          filename: "./errors.log",
          level: "error",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.colorize({ all: true })
          ),
        }),
        new winston.transports.File({
          filename: "./errors.log",
          level: "fatal",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.colorize({ all: true })
          ),
        }),
      ],
    });

    logger.info(`CONFIG MODE: ${config.mode}`);
    
    
    break;
  case 'PRODUCTION':
     logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: "info",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          filename: "../errors/errors.log",
          level: "warning",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          filename: "../errors/errors.log",
          level: "error",
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          filename: "../errors/errors.log",
          level: "fatal",
          format: winston.format.colorize({ all: true }),
        }),
      ],
    });
    logger.info(`CONFIG MODE: ${config.mode}`);
    break;
  default:
    break;
}


export default logger