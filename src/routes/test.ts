import express from 'express';
import auth from '../helpers/verifyWebToken';

const Router = express.Router();

Router.use(auth);

Router.get('/', (req, res) => {
  res.json({posts: {title: 'My post', description: 'Blah blah blah'}, user: req.user});
});

export default Router;