import { Request, Response, NextFunction } from 'express';
import httpResponse from '../util/httpResponse';
import httpMassage from '../constant/httpMassage';
import httpError from '../util/httpError';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpResponse(req, res, 200, httpMassage.SUCCESS, null);
    } catch (err) {
      httpError(next, err, req, 500);
    }
  },
};

