import winston from 'winston';

const { combine, timestamp, errors, json, printf } = winston.format;

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  defaultMeta: { service: 'wire-backend' },
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        printf(({ timestamp: currentTime, level, message, ...meta }) => {
          return `${currentTime} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
      )
    })
  ]
});
