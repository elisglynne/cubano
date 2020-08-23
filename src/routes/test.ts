import express, { Request } from 'express';
import auth from '../helpers/verifyWebToken';

interface IResponse extends Request {
  user?: any;
}

const Router = express.Router();
Router.use(() => auth);


Router.get('/', (req: IResponse, res) => {
  res.json({posts: {title: 'My post', description: 'Blah blah blah'}, user: req.user});
});

export default Router;