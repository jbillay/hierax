import l from '../../common/logger';
import { IUser } from './userModels';
import bcrypt from 'bcryptjs';

export interface IUserInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SequeliseReturnObject {
  user: IUser;
  created: boolean;
}

class UserService {
  // tslint:disable-next-line:no-shadowed-variable
  public async byId(db, id: number): Promise<IUser> {
    try {
      const user: IUser = await db.User.findOne({ where: { id } });
      if (user) {
        l.info(`User [${user.id}] = ${user.email}`, 'Fetch one user by Id');
        delete user.password;
        return user;
      } else {
        l.info(`User with id ${id} not found`, 'Fetch one user by Id');
        return null;
      }
    } catch (error) {
      l.error(`Error in byId from UserService: ${error}`);
      return null;
    }
  }

  public async byEmail(db, email: string): Promise<IUser> {
    try {
      const user: IUser = await db.User.findOne({ where: { email } });
      if (user) {
        l.info(`User [${user.id}] = ${user.email}`, 'Fetch one user by email');
        return user;
      } else {
        l.info(`User with email ${email} not found`, 'Fetch one user by email');
        return null;
      }
    } catch (error) {
      l.error(`Error in byEmail from UserService: ${error}`);
      return null;
    }
  }

  public async create(db, userInfo: IUserInfo): Promise<IUser> {
    try {
      const hashPassword: string = bcrypt.hashSync(userInfo.password, 12);
      const userReturn: any[] = await db.User.findOrCreate({ where: {
        email: userInfo.email, password: hashPassword,
        firstName: userInfo.firstName, lastName: userInfo.lastName,
      } });
      if (userReturn[1] === false) {
        l.error(`Error in create from UserService: findOrCreate return false`);
        return null;
      }
      const user: IUser = userReturn[0];
      l.info(`New user [${user.id}] / ${user.email}`, 'Create a user');
      delete user.password;
      return user;
    } catch (error) {
      l.error(`Error in create from UserService: ${error}`);
      return null;
    }
  }
}

export const userService = new UserService();
