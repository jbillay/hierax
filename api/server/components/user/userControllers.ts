import { Request, Response } from 'express';
import { IUserInfo, userService} from './userServices';
import { IUser } from './userModels';

class Controller {
  public async getById(req: Request, res: Response): Promise<void> {
    if (req.params && req.params.id) {
      const userId: number = parseInt(req.params.id, 0);
      const user: IUser = await userService.byId(res.app.locals.db, userId);
      if (user) {
        res.jsonp({ status: 'success', user });
      } else {
        res.jsonp({ status: 'error', msg: `Cannot get information on user ${userId}` });
      }
    } else {
      res.jsonp({ status: 'error', msg: `Id needs to be provided` });
    }
  }
  public async getByName(req: Request, res: Response): Promise<void> {
    if (req.params && req.params.name) {
      const userName: string = req.params.name;
      const user: IUser = await userService.byEmail(res.app.locals.db, userName);
      if (user) {
        res.jsonp({ status: 'success', user });
      } else {
        res.jsonp({ status: 'error', msg: `Cannot get information on user ${userName}` });
      }
    } else {
      res.jsonp({ status: 'error', msg: `Username needs to be provided` });
    }
  }
  public async create(req: Request, res: Response): Promise<void> {
    if (req.body) {
      const userInfo: IUserInfo = req.body;
      const user: IUser = await userService.create(res.app.locals.db, userInfo);
      if (user) {
        res.status(201);
        res.jsonp({ status: 'success', user });
      } else {
        res.status(500);
        res.jsonp({ status: 'error', msg: `Something went wrong with the user creation` });
      }
    } else {
      res.status(412);
      res.jsonp({ status: 'error', msg: `User info needs to be provided` });
    }
  }
}

export default new Controller();
