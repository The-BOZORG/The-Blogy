import Server from './index';
import { config } from '@/configs/index';
import { connectDB, disconnectDB } from '@/configs/database';
import { connectRedis, disconnectRedis } from '@/configs/redis';
import { logger } from '@/utils/logger';

const server = new Server();

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    await connectRedis();

    server.start();

    const app = server.getApplication();

    app.listen(config.PORT, () => {
      logger.info(`server running on http://localhost:${config.PORT}`, {
        service: 'Server',
      });
    });
  } catch (error) {
    logger.error('failed to start server', {
      service: 'Server',
      error,
    });

    process.exit(1);
  }
};

const shutdownServer = async (signal: string): Promise<void> => {
  logger.warn(`${signal} received. shutting down server...`, {
    service: 'Server',
  });

  try {
    await disconnectDB();
    await disconnectRedis();

    logger.info('server shutdown completed', {
      service: 'Server',
    });

    process.exit(0);
  } catch (error) {
    logger.error('error during server shutdown', {
      service: 'Server',
      error,
    });

    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void shutdownServer('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdownServer('SIGTERM');
});

void startServer();
