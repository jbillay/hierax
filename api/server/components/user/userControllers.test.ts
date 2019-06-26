import controller from './userControllers';
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
          findOne(config: any) { return { id: 1, email: 'jbillay@gmail.com' }; },
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

test('Check Controllers getById working', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const req: any = {
    params: {
      id: 1,
    },
  };
  await controller.getById(req, res);
  expect(spy.withArgs({ status: 'success', user: { id: 1, email: 'jbillay@gmail.com' } })
      .calledOnce).toBeTruthy();
});

test('Check Controllers getById not working missing parameters', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const req: any = {};
  await controller.getById(req, res);
  expect(spy.withArgs({ status: 'error', msg: 'Id needs to be provided' })
    .calledOnce).toBeTruthy();
});

test('Check Controllers getById not working', async () => {
  const localRes: any = {
    jsonp(args: any) { return null; },
    app: { locals: { db: {} } },
  };
  const spy: any = sinon.spy(localRes, 'jsonp');
  const req: any = {
    params: {
      id: 1,
    },
  };
  await controller.getById(req, localRes);
  expect(spy.withArgs({ status: 'error', msg: 'Cannot get information on user 1' })
      .calledOnce).toBeTruthy();
});

test('Check Controllers getByName working', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const req: any = {
    params: {
      name: 'jbillay@gmail.com',
    },
  };
  await controller.getByName(req, res);
  expect(spy.withArgs({ status: 'success', user: { id: 1, email: 'jbillay@gmail.com' } })
    .calledOnce).toBeTruthy();
});

test('Check Controllers getByName not working missing parameters', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const req: any = {};
  await controller.getByName(req, res);
  expect(spy.withArgs({ status: 'error', msg: 'Username needs to be provided' })
    .calledOnce).toBeTruthy();
});

test('Check Controllers getByName not working', async () => {
  const localRes: any = {
    jsonp(args: any) { return null; },
    app: { locals: { db: {} } },
  };
  const spy: any = sinon.spy(localRes, 'jsonp');
  const req: any = {
    params: {
      name: 'jbillay@gmail.com',
    },
  };
  await controller.getByName(req, localRes);
  expect(spy.withArgs({ status: 'error', msg: 'Cannot get information on user jbillay@gmail.com' })
    .calledOnce).toBeTruthy();
});


test('Check Controllers create working', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const spyStatus: any = sinon.spy(res, 'status');
  const req: any = {
    body: {
      email: 'jbillay@gmail.com',
      password: 'lqksdjlqsjdlqsjl',
      firstName: 'Jeremy',
      lastName: 'Billay',
    },
  };
  await controller.create(req, res);
  expect(spyStatus.withArgs(201).calledOnce).toBeTruthy();
  expect(spy.withArgs({
    status: 'success', user: {
      id: 1, email: 'jbillay@gmail.com', firstName: 'Jeremy', lastName: 'Billay' } })
    .calledOnce).toBeTruthy();
});

test('Check Controllers create not working missing parameters', async () => {
  const spy: any = sinon.spy(res, 'jsonp');
  const spyStatus: any = sinon.spy(res, 'status');
  const req: any = {};
  await controller.create(req, res);
  expect(spyStatus.withArgs(412).calledOnce).toBeTruthy();
  expect(spy.withArgs({ status: 'error', msg: 'User info needs to be provided' })
    .calledOnce).toBeTruthy();
});

test('Check Controllers create not working', async () => {
  const localRes: any = {
    jsonp(args: any) { return null; },
    status(code: number) { return null; },
    app: { locals: { db: {} } },
  };
  const spy: any = sinon.spy(localRes, 'jsonp');
  const spyStatus: any = sinon.spy(localRes, 'status');
  const req: any = {
    body: {
      email: 'jbillay@gmail.com',
      password: 'lqksdjlqsjdlqsjl',
      firstName: 'Jeremy',
      lastName: 'Billay',
    },
  };
  await controller.create(req, localRes);
  expect(spyStatus.withArgs(500).calledOnce).toBeTruthy();
  expect(spy.withArgs({ status: 'error', msg: 'Something went wrong with the user creation' })
    .calledOnce).toBeTruthy();
});
