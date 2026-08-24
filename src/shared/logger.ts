import { config } from '@/configs/index';
import { createLogger, format, transport, transports } from 'winston';

const transportation: transport[] = [];

const { colorize, combine, timestamp, printf } = format;

if (config.NODE_ENV === 'development') {
  transportation.push(
    new transports.Console({
      format: combine(
        timestamp({ format: 'HH:mm:ss' }),
        colorize({ all: true }),
        printf(({ level, message, timestamp, service }) => {
          const formattedLevel = level.toUpperCase().padEnd(5);

          return `${formattedLevel} | ${timestamp} | ${service ?? 'App'} | ${message}`;
        }),
      ),
    }),
  );
}

export const logger = createLogger({
  transports: transportation,
});

/* 
logger.info('User created successfully', {
  service: 'UserService',
});
*/
