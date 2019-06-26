import * as jwt from 'jwt-simple';
import moment from 'moment';
import { Request, Response } from 'express';
import { userService } from '../user/userServices';
import { IUser } from '../user/userModels';
import bcrypt from 'bcryptjs';

export class Controller {
  public async login(req: Request, res: Response): Promise<void> {
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.status(401);
      res.jsonp({
          status: 'error',
          message: `Parameters are missing: ${errors}`,
        });
    }
    try {
      const user: IUser = await userService.byEmail(
        res.app.locals.db,
        req.body.username,
      );
      if (user === null) {
        res.status(401);
        res.jsonp({ status: 'error', message: 'User not found' });
      } else {
        const success = bcrypt.compareSync(req.body.password, user.password);
        if (success === false) {
          res.status(401);
          res.jsonp({status: 'error', message: 'Invalid credentials'});
        } else {
          const expires = moment().utc().add({ days: 7 }).unix();
          const token = jwt.encode({ exp: expires, username: user.email }, process.env.JWT_SECRET);
          const userToken = {
            token,
            expires: moment.unix(expires).format(),
            user: user.id,
          };
          res.status(200);
          res.jsonp({
            status: 'success',
            user: userToken,
          });
        }
      }
    } catch (err) {
      res.status(401);
      res.jsonp({ message: `Something went wrong: ${err}` });
    }
  }
}
export default new Controller();
