import controller from './authControllers';
import sinon from 'sinon';

afterEach(() => {
  sinon.restore();
});

const res: any = {
  jsonp(args: any) { return null; },
  status(code: number) { return code; },
  app: {
    locals: {
      db: {
        User: {
          findOne(config: any) { return {
            id: 1, email: 'jbillay@gmail.com',
            password: '$2a$12$6BpU/sGEUvD9NjuNNEzav..GAc.gTWv5yQrrPyLZaI0sh.2INBN5e',
            firstName: 'Jeremy', lastName: 'Billay' };
          },
          findOrCreate(config: any) {
            return [ {
              id: 1, email: 'jbillay@gmail.com', password: 'shoudntbehere',
              firstName: 'Jeremy', lastName: 'Billay',
            }, true ];
          },

        },
      },
    },
  },
};
process.env.JWT_SECRET = 'ipR6fjM%T$oc/yl5Govsu&W41';

test('Check Controllers login working', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const spyStatus: any = sinon.spy(res, 'status');
  const req: any = {
    body: {
      username: 'jbillay@gmail.com',
      password: 'noofs',
    },
    checkBody(param: any, msg: string) {
      return {
        notEmpty() { return null; },
      };
    },
    validationErrors() { return null; },
  };
  await controller.login(req, res);
  expect(spyStatus.withArgs(200)).toBeTruthy();
  expect(spy.calledOnce).toBeTruthy();
});

test('Check Controllers login error in the parameters passed', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const spyStatus: any = sinon.spy(res, 'status');
  const req: any = {
    body: {
      username: 'jbillay@gmail.com',
    },
    checkBody(param: any, msg: string) {
      return {
        notEmpty() { return null; },
      };
    },
    validationErrors() { return 1; },
  };
  await controller.login(req, res);
  expect(spyStatus.withArgs(401)).toBeTruthy();
  expect(spy.withArgs({ status: 'error', message: `Parameters are missing: 1` })
    .calledOnce).toBeTruthy();
});

test('Check Controllers login user not found', async () => {
  const resLocal: any = {
    jsonp(args: any) { return null; },
    status(code: number) { return code; },
    app: {
      locals: {
        db: {
          User: {
            findOne(config: any) { return null; },
          },
        },
      },
    },
  };
  const spy: any = sinon.spy(resLocal, 'jsonp');
  const spyStatus: any = sinon.spy(resLocal, 'status');
  const req: any = {
    body: {
      username: 'jbillay@gmail.com',
      password: 'noofs',
    },
    checkBody(param: any, msg: string) {
      return {
        notEmpty() { return null; },
      };
    },
    validationErrors() { return null; },
  };
  await controller.login(req, resLocal);
  expect(spyStatus.withArgs(401)).toBeTruthy();
  expect(spy.withArgs({ status: 'error', message: `User not found` })).toBeTruthy();
});

test('Check Auth Controllers login not working due to wrong password', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const spyStatus: any = sinon.spy(res, 'status');
  const req: any = {
    body: {
      username: 'jbillay@gmail.com',
      password: 'wrong',
    },
    checkBody(param: any, msg: string) {
      return {
        notEmpty() { return null; },
      };
    },
    validationErrors() { return null; },
  };
  await controller.login(req, res);
  expect(spyStatus.withArgs(401)).toBeTruthy();
  expect(spy.withArgs({ status: 'error', message: `Invalid credentials` })).toBeTruthy();
});
