import { IUserInfo, userService } from './userServices';
import { IUser } from './userModels';

describe('User Service', () => {
  test('Check Service byId working', async () => {
    const db: any = {
      User: {
        findOne(config: any) { return { id: 1, email: 'jbillay@gmail.com' }; },
      },
    };
    const user: IUser = await userService.byId(db, 1);
    expect(user).toEqual({ id: 1, email: 'jbillay@gmail.com' });
  });

  test('Check Service byId return null as user not exist', async () => {
    const db: any = {
      User: {
        findOne(config: any) { return null; },
      },
    };
    const user: IUser = await userService.byId(db, 1);
    expect(user).toBeNull();
  });

  test('Check Service byId not working', async () => {
    const db: any = {};
    const user: IUser = await userService.byId(db, 1);
    expect(user).toEqual(null);
  });

  test('Check Service byEmail working', async () => {
    const db: any = {
      User: {
        findOne(config: any) { return { id: 1, email: 'jbillay@gmail.com' }; },
      },
    };
    const user: IUser = await userService.byEmail(db, 'jbillay@gmail.com');
    expect(user).toEqual({ id: 1, email: 'jbillay@gmail.com' });
  });

  test('Check Service byEmail return null as user not exist', async () => {
    const db: any = {
      User: {
        findOne(config: any) { return null; },
      },
    };
    const user: IUser = await userService.byEmail(db, 'jbillay@gmail.com');
    expect(user).toBeNull();
  });

  test('Check Service byEmail working', async () => {
    const db: any = {};
    const user: IUser = await userService.byEmail(db, 'jbillay@gmail.com');
    expect(user).toEqual(null);
  });

  test('Check Service create working', async () => {
    const db: any = {
      User: {
        findOrCreate(config: any) {
          return [{
            id: 1, email: 'jbillay@gmail.com', password: 'shoudntbehere',
            firstName: 'Jeremy', lastName: 'Billay',
          }, true];
        },
      },
    };
    const userInfo: IUserInfo = {
      email: 'jbillay@gmail.com',
      password: 'test',
      firstName: 'Jeremy',
      lastName: 'Billay',
    };
    const user: IUser = await userService.create(db, userInfo);
    expect(user).toEqual({ id: 1, email: 'jbillay@gmail.com', firstName: 'Jeremy', lastName: 'Billay' });
  });

  test('Check User Service create not working due to false on findOrCreate', async () => {
    const db: any = {
      User: {
        findOrCreate(config: any) {
          return [{
            id: 1, email: 'jbillay@gmail.com', password: 'shoudntbehere',
            firstName: 'Jeremy', lastName: 'Billay',
          }, false];
        },
      },
    };
    const userInfo: IUserInfo = {
      email: 'jbillay@gmail.com',
      password: 'test',
      firstName: 'Jeremy',
      lastName: 'Billay',
    };
    const user: IUser = await userService.create(db, userInfo);
    expect(user).toEqual(null);
  });

  test('Check User Service create not working', async () => {
    // $2b$12$zsVJJ3JxH5OW/hoDZs4M2eJdewy1AG1o8YHXYkOFxDcwbhtWUskCC
    const db: any = {};
    const userInfo: IUserInfo = {
      email: 'jbillay@gmail.com',
      password: 'test',
      firstName: 'Jeremy',
      lastName: 'Billay',
    };
    const user: IUser = await userService.create(db, userInfo);
    expect(user).toEqual(null);
  });
});

