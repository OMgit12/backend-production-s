import {Request ,Response} from 'express'
import { HttpApiResponse } from '../types/types';
import config  from '../config/config';
import {EApplicationEnviroment} from '../constant/application';

export default (req: Request, res: Response, ResponceStatusCode: number, ResponceMassage: string , data: unknown) => {
    const responce: HttpApiResponse = {
        statusCode: ResponceStatusCode,
        successL: true,
        request: {
            ip: req.ip || null,
            method: req.method,
            path: req.path,
            url: req.originalUrl // req.url has the mount point stripped off
            
        },
        massage: ResponceMassage,
        data: data,
    }

    // log
    console.info(`RESPONSE`, { meta: responce });

    //prodcution
    if (config.ENV ===  EApplicationEnviroment.PRODUCTION) {
        delete responce.request.ip
    }   
    
    res.status(ResponceStatusCode).json(responce);
}