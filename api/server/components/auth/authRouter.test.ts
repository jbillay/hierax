import '../../common/env';
import request from 'supertest';
import Server from '../../common/server';
import routes from '../../routes';
import { Application } from 'express';
import ExpressServer from '../../common/server';

const port: number = parseInt(process.env.PORT, 0);
const db = {
  User: {
    findOne(config: any) {
      return {
        id: 1, email: 'jbillay@gmail.com',
        password: '$2a$12$6BpU/sGEUvD9NjuNNEzav..GAc.gTWv5yQrrPyLZaI0sh.2INBN5e',
        firstName: 'Jeremy', lastName: 'Billay',
      };
    },
  },
};
let app: Application;

beforeAll(async () => {
  const server: ExpressServer = new Server(db);
  app = await server.router(routes);
});

describe('routes: auth login', () => {
  test('should respond as expected', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      username: 'jbillay@gmail.com',
      password: 'noofs',
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.user.token).toBeDefined();
    expect(response.body.user.user).toBe(1);
  });
});
