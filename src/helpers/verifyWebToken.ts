import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import { send } from 'process';

interface IResponse extends Request {
  user: string | object
}

interface IJwtToken {
  _id: string,
  iat: number;
  exp: number;
}

function auth(req: IResponse, res: Response, next: NextFunction) {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send('Access denied');
  } else {
    try {
      const verified = jwt.verify(token, process.env.JWT_TOKEN as string) as IJwtToken;
      if  (typeof verified !== 'string') {
        try {
          User.findById({_id: verified._id}).then(
            (user) => {
              req.user = user || {};
              next();
            }
          );
        } catch (error) {
          res.status(400).send("Unable to find associated user");
        }
      } else {
        res.status(400).send("Error returning token.")
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
}

export default auth;