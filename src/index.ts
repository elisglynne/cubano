import express from 'express';
import authRoutes from './routes/auth';

const app = express();
const port = 8080;
const authRoute = authRoutes.registerRoute;

const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${ port }`);
});

app.use('/api/user', authRoute);

app.route('/').get((req, res) => {
  res.send('Hi there, big sausage');
});

/**
* Webpack HMR Activation
*/

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}