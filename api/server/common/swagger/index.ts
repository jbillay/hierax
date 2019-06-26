import middleware from 'swagger-express-middleware';
import { Application } from 'express';
import path from 'path';
import L from '../logger';

export default async function(app: Application, routes: (app: Application) => void) {
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line:no-shadowed-variable
    middleware(path.join(__dirname, 'Api.yaml'), app, (err: any, middleware: any) => {
      /* istanbul ignore next: swagger middleware error */
      if (err) {
        L.error(err);
        reject(null);
      }

      app.use(middleware.metadata());
      app.use(
        middleware.files(app, {
          apiPath: process.env.SWAGGER_API_SPEC,
        }),
      );    // These two middleware don't have any options (yet)
      app.use(middleware.CORS(), middleware.validateRequest());


      routes(app);
      resolve(null);
  });
});
}

