import '../server/common/env';
import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import { Application } from 'express';
import ExpressServer from '../server/common/server';

const port: number = parseInt(process.env.PORT, 0);
const dbOk = {
  sequelize: {
    sync(force: object) {
      // tslint:disable-next-line:no-shadowed-variable
      return new Promise((resolve: any, reject: any) => { resolve(true); });
    },
  },
};
const dbKo = {
  sequelize: {
    sync(force: object) {
      // tslint:disable-next-line:no-shadowed-variable
      return new Promise((resolve: any, reject: any) => { reject(false); });
    },
  },
};
let app: Application;

describe('Test Routes: Sync Db', () => {
  test('Response should be ok and code 200', async () => {
    const server: ExpressServer = new Server(dbOk);
    app = await server.router(routes);
    const response = await request(app).get('/v1/syncDb');
    expect(response.status).toBe(200);
    expect(response.body.status).toStrictEqual('success');
    expect(response.body.msg).toStrictEqual('DB synchronised succesfully');
  });
  test('Response should be ok and code 200', async () => {
    const server: ExpressServer = new Server(dbKo);
    app = await server.router(routes);
    const response = await request(app).get('/v1/syncDb');
    expect(response.status).toBe(500);
    expect(response.body.status).toStrictEqual('error');
    expect(response.body.msg).toStrictEqual('Error with DB synchronisation');
  });
});
