import express from 'express';
import User from '../model/User';
import { registerValidation, loginValidation } from '../validation/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const Router = express.Router();

export const registerRoute = Router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  if (error) {
    const errorMessage = error?.details[0].message;
    res.status(400).send(errorMessage || 'There was an error');
  }

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) {
    return res.status(400).send('Email already exists');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, 
  })
  
  try {
    const savedUser = await (await user.save()).toJSON();
    const {username, _id, email} = savedUser;
    res.send({username, _id, email});
  } catch (error) {
    res.status(400).send(error);
  }
}); 

export const loginRoute = Router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) {
    const errorMessage = error?.details[0].message;
    res.status(400).send(errorMessage || 'There was an error');
  }

  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send('Email address or password is incorrect');
  } else if (!await bcrypt.compare(req.body.password, user.toJSON().password)) {
    return res.status(403).send('Email address or password is incorrect');
  }
  const { username, _id, email } = user.toJSON();
  const token = jwt.sign({ _id }, process.env.JWT_TOKEN as string, {expiresIn: "1day"})
  res.header('auth-token', token).send({username, _id, email, authToken: token });

});

export default Router;
