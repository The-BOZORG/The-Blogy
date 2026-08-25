import { createClient } from 'redis';
import { logger } from '@/shared/logger';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('ready', () => {
  logger.info('redis connected successfully', {
    service: 'Redis',
  });
});

redisClient.on('error', (error) => {
  logger.error('redis client error', {
    service: 'Redis',
    error,
  });
});

redisClient.on('end', () => {
  logger.warn('redis connection closed', {
    service: 'Redis',
  });
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
};
