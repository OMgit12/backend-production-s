import express, { Application, Response ,Request, NextFunction } from 'express';
import path from 'path';
import router from './router/apirouter';
import errorHandler from './middelware/errorHandler';
import responceMassage from './constant/httpMassage';
import httpError from './util/httpError';
import logger from './util/logger';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

// middelware
app.use(helmet());

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true
  }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to log incoming requests
app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    next();
  });
 
// routes
app.use('/api/v1', router);

// Global error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(`Error: ${err.message} - Stack: ${err.stack}`);
    
    // Send a generic error response
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  });

 
// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responceMassage.NOT_FOUND('route'));
    } catch (error) {
        httpError(next, error, req, 404);
    }
})

//handler golobal error 
app.use(errorHandler);

export default app;
