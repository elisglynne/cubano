import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../model/User';

interface IResponse extends Request {
  user: string | object
}

function auth(req: IResponse, res: Response, next: NextFunction) {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send('Access denied');
  } else {
    try {
      const verified = jwt.verify(token, process.env.JWT_TOKEN as string);
      req.user = verified;
      User.findById({_id: verified._id}).then(
        (user) => {
          req.user = user;
          next();
        }
      );
      // next();
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
}

export default auth;