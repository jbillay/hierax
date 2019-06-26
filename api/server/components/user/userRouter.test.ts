import '../../common/env';
import request from 'supertest';
import Server from '../../common/server';
import routes from '../../routes';
import { Application } from 'express';
import ExpressServer from '../../common/server';

const port: number = parseInt(process.env.PORT, 0);
const db = {};
let app: Application;

beforeAll(async () => {
  const server: ExpressServer = new Server(db);
  app = await server.router(routes);
});

describe('routes: user index', () => {
  test('should respond as expected', async () => {
    const response = await request(app).get('/v1/user/89');
    expect(response.body.status).toStrictEqual('error');
    expect(response.body.msg).toStrictEqual('Cannot get information on user 89');
  });
});
