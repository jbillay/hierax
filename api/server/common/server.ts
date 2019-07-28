import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger/index';
import auth from './auth';
import L from './logger';

const app = express();

interface AuthInfo {
  name: string;
  message: string;
}

export default class ExpressServer {
  constructor(database: any) {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(expressValidator());
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      }),
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(session({
      resave: true,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    }));
    app.use(express.static(`${root}/public`));
    app.enable('case sensitive routing');
    app.enable('strict routing');

    app.use(auth.initialize());

    app.all(process.env.API_BASE + '*', (req, res, next) => {
      if (req.method === 'OPTIONS') {
        return next();
      }

      if (req.path.includes(process.env.API_BASE + 'auth/login')) {
        return next();
      }
      if (req.path.includes(process.env.API_BASE + 'user')) {
        return next();
      }

      // TODO: To be removed
      if (req.path.includes(process.env.API_BASE + 'syncDb')) {
        return next();
      }

      return auth.authenticate((err, user, info: AuthInfo) => {
        /* istanbul ignore next: passport internal error */
        if (err) { return next(err); }
        if (!user) {
          if (info.name === 'TokenExpiredError') {
            return res.status(401).jsonp({ status: 'error', msg: 'Your token has expired. Please generate a new one' });
          } else {
            return res.status(401).jsonp({ status: 'error', msg: info.message });
          }
        }
        app.set('user', user);
        return next();
      })(req, res, next);
    });
    app.locals.db = database;
  }

  public async router(routes: (app: Application) => void): Promise<Application> {
    await swaggerify(app, routes);
    return app;
  }
}
