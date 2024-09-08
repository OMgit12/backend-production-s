import { HttpError } from '../types/types';
import { Request } from 'express';
import config from '../config/config';
import {EApplicationEnviroment} from '../constant/application';
import responseMessage  from '../constant/httpMassage';

export default (error: Error | unknown, req: Request, errorStatusCode: number): HttpError => {
    const errorObj: HttpError = {
        statusCode: errorStatusCode,
        successL: false,
        request: {
            ip: req.ip,
            method: req.method,
            path: req.path,
            url: req.originalUrl,
        },
        massage:  error instanceof Error ? error.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        traces: error instanceof Error ? { Error: error.stack} : null,
    };

    // log
    console.error(`CONTROLLER_LOG ERROR`, { meta: errorObj });

    // production
    if (config.ENV ===  EApplicationEnviroment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.traces 
    }   

    return errorObj;
};
      
    