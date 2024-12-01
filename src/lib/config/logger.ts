import winston from 'winston';

import { config } from '@/lib/config/config';

// Custom format to handle Error objects
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    // Attach stack trace as the message if it's an Error instance
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Create a logger instance
const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info', // Debug in development, info in production
  format: winston.format.combine(
    enumerateErrorFormat(), // Handle Error object formats
    config.env === 'development'
      ? winston.format.colorize() // Colorized output in development
      : winston.format.uncolorize(), // Remove colors in production
    winston.format.splat(), // Allow for string formatting
    winston.format.printf(({ level, message }) => `${level}: ${message}`) // Custom log message format
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'], // Output errors to stderr
    }),
  ],
});

export default logger;
