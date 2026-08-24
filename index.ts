import { config } from './src/configs/index';
import express, { Application } from 'express';
import { prisma } from './src/configs/database';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(
      compression({
        threshold: 1024,
      }),
    );
    this.app.use(helmet());
  }

  private setupRoutes(): void {
    // routes
  }

  private setupGlobalError(): void {
    // global error handler
  }

  public getApplication(): Application {
    return this.app;
  }
}
export default Server;
