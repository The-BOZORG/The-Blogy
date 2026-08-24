import Server from './index';
import { config } from './src/configs/index';
import { connectDB, disconnectDB } from './src/configs/database';
import { logger } from './src/shared/logger';

const server = new Server();

const startServer = async (): Promise<void> => {
  await connectDB();

  server.start();

  const app = server.getApplication();

  app.listen(config.PORT, () => {
    logger.info(`server running on http://localhost:${config.PORT}`, {
      service: 'Server',
    });
  });
};

const shutdownServer = async (signal: string): Promise<void> => {
  logger.warn(`${signal} received. Shutting down server...`, {
    service: 'Server',
  });

  await disconnectDB();

  process.exit(0);
};

process.on('SIGINT', () => {
  shutdownServer('SIGINT');
});

process.on('SIGTERM', () => {
  shutdownServer('SIGTERM');
});

startServer();
