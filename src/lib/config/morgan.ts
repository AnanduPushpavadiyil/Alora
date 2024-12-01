import morgan, { StreamOptions } from 'morgan';

import { config } from '@/lib/config/config';

import logger from './logger';

// Custom token for error message handling
morgan.token('message', (req, res) => res.locals.errorMessage || '');

// Determine the IP format based on the environment
const getIpFormat = (): string =>
  config.env === 'production' ? ':remote-addr - ' : '';

// Define formats for success and error responses
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Create a stream for success logs
const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400, // Skip if the response status is 400 or above
  stream: {
    write: (message: string) => logger.info(message.trim()), // Log to info level
  } as StreamOptions, // Type the stream as StreamOptions
});

// Create a stream for error logs
const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400, // Skip if the response status is below 400
  stream: {
    write: (message: string) => logger.error(message.trim()), // Log to error level
  } as StreamOptions, // Type the stream as StreamOptions
});

// Export the handlers
export { errorHandler, successHandler };
