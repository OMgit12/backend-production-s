import { Request, Response, NextFunction } from 'express';
import httpResponse from '../util/httpResponse';
import httpMassage from '../constant/httpMassage';
import httpError from '../util/httpError';
import quiker from '../util/quiker';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponse(req, res, 200, httpMassage.SUCCESS, null);
    } catch (err) {
      httpError(next, err, req, 500);
    }
  },

  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const  healthdata = {
        application: quiker.getApplicationHealth(),
        system: quiker.getSystemHealth(),
        timeStamp: Date.now()  
      }

      httpResponse(req, res, 200, httpMassage.SUCCESS, healthdata);
    } catch (err) {
      httpError(next, err, req, 500);
    }
  },

};

