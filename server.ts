import Server from './index';
import { config } from './src/configs/index';
import { connectDB, disconnectDB } from './src/configs/database';

const server = new Server();

const startServer = async (): Promise<void> => {
  await connectDB();

  server.start();

  const app = server.getApplication();

  app.listen(config.PORT, () => {
    console.log(`server running on http://localhost:${config.PORT}`);
  });
};

const shutdownServer = async (signal: string): Promise<void> => {
  console.log(`${signal} received. Shutting down server...`);

  await disconnectDB();

  process.exit(0);
};

process.on('SIGINT', () => {
  void shutdownServer('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdownServer('SIGTERM');
});

void startServer();
