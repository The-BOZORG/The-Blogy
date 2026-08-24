import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { errorHandler } from '@/middlewares/globalErrorHandler';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { ApiResponse } from '@/shared/apiResponse';

class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  public start() {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
  }

  private setupMiddleware() {
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

  private setupRoutes() {
    this.app.get('/', (req, res) => {
      res.status(200).json(ApiResponse(200, null, 'Welcome to Blog API 👋'));
    });

    this.app.get('/favicon.ico', (req, res) => {
      res.status(204).end();
    });

    // appRoutes(this.app)
  }

  private setupGlobalError() {
    //404 middleware
    this.app.all('/{*splat}', (req, res, next) => {
      next(
        new NotFoundError(
          `the URL ${req.originalUrl} not found with this method ${req.method}`,
        ),
      );
    });

    this.app.use(errorHandler);
  }

  public getApplication(): Application {
    return this.app;
  }
}

export default Server;
