import express, { Application, Response ,Request, NextFunction } from 'express';
import path from 'path';
import router from './router/apirouter';
import errorHandler from './middelware/errorHandler';
import responceMassage from './constant/httpMassage';
import httpError from './util/httpError';

const app: Application = express();

// middelware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/api/v1', router);

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
