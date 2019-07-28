import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { IUser } from '../components/user/userModels';

type ICallback = (error: Error, result?: object, message?: object) => void;

class Auth {
  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  }

  // tslint:disable-next-line:max-line-length
  public authenticate = (callback: ICallback) => passport.authenticate('jwt', { session: false, failWithError: true }, callback);

  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    };

    return new Strategy(params, (req: Request, payload: any, done: ICallback) => {
      req.app.locals.db.User.findOne({ where: { email: payload.email }})
        .then((user: IUser) => {
          /* istanbul ignore next: passport return */
          if (user === null) {
            return done(null, null, { message: 'The user in the token was not found' });
          }
          delete user.password;
          return done(null, { user });
      })
      .catch((err: any) => {
      /* istanbul ignore next: passport return */
        if (err) {
          return done(err);
        }
      });
    });
  }

}

export default new Auth();
