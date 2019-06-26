import controller from './entityControllers';
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
        Entity: {
          async findOne(config: any) { return { id: 1, name: 'Jeremy Ltd.' }; },
          async findAll() { return [{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }]; },
        },
      },
    },
  },
};

describe('Test Controllers: Entity', () => {
  describe('Test Controllers: Entity All', () => {
    test('Check Controllers all working', async () => {
      const spy: any = sinon.spy(res, 'jsonp');
      const req: any = {};
      await controller.all(req, res);
      expect(spy.withArgs({ status: 'success', entities: [{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }] })
        .calledOnce).toBeTruthy();
    });
    test('Check Controllers all not working', async () => {
      const localRes: any = {
        jsonp(args: any) { return null; },
        app: { locals: { db: {} } },
      };
      const spy: any = sinon.spy(localRes, 'jsonp');
      const req: any = {};
      await controller.all(req, localRes);
      expect(spy.withArgs({ status: 'error', msg: 'Cannot get all entities' })
        .calledOnce).toBeTruthy();
    });
  });
  describe('Test Controllers: Entity getById', () => {
    test('Check Controllers getById working', async () => {
      const spy: any = sinon.spy(res, 'jsonp');
      const req: any = {
        params: {
          id: 1,
        },
      };
      await controller.getById(req, res);
      expect(spy.withArgs({ status: 'success', entity: { id: 1, name: 'Jeremy Ltd.' } })
        .calledOnce).toBeTruthy();
    });
    test('Check Controllers all not working', async () => {
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
      expect(spy.withArgs({ status: 'error', msg: 'Cannot get information on entity 1' })
        .calledOnce).toBeTruthy();
    });
  });
});
