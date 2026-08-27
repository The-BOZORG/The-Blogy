import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import '@/google/google.strategy';

import { errorHandler } from '@/middlewares/globalErrorHandler';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { corsOptions } from '@/utils/core';

import appRoutes from '@/routes';

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
    this.app.use(cors(corsOptions));
    this.app.use(
      compression({
        threshold: 1024,
      }),
    );
    this.app.use(helmet());
    this.app.use(cookieParser());

    this.app.use(passport.initialize());
  }

  private setupRoutes() {
    this.app.use('/api/v1', appRoutes);
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
