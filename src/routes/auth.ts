import {Router} from 'express';

export const registerRoute = Router().post('/register', (req, res) => {
  res.send('Register');
});

export const loginRoute = Router().post('/login', (req, res) => {

});

export default {
  registerRoute,
  loginRoute
}
