import '../server/common/env';
import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import { Application } from 'express';
import ExpressServer from '../server/common/server';
import * as jwt from 'jwt-simple';
import moment from 'moment';

const port: number = parseInt(process.env.PORT, 0);
const db = {
  User: {
    async findOne(config: any) {
      return new Promise((resolve, reject) => {
        resolve({
          id: 1, email: 'jbillay@gmail.com',
          password: '$2a$12$6BpU/sGEUvD9NjuNNEzav..GAc.gTWv5yQrrPyLZaI0sh.2INBN5e',
          firstName: 'Jeremy', lastName: 'Billay',
        });
      });
    },
  },
};
let app: Application;

beforeAll(async () => {
  const server: ExpressServer = new Server(db);
  app = await server.router(routes);
});

describe('Test Routes: Auth mechanism', () => {
  test('Should return failed due to missing token', async () => {
    const token = false;
    const responseEntity = await request(app)
      .get('/v1/entity')
      .set('Authorization', 'Bearer ' + token);
    expect(responseEntity.status).toBe(401);
    expect(responseEntity.body.status).toEqual('error');
  });
  test('Should return failed due to an expired token', async () => {
    const expires = moment().utc().subtract(10, 'seconds').unix();
    const expiredToken = jwt.encode({
        exp: expires,
        email: 'jbillay@gmail.com',
        firstName: 'Jeremy',
        lastName: 'Billay',
      }, process.env.JWT_SECRET);
    const responseEntity = await request(app)
      .get('/v1/entity')
      .set('Authorization', 'Bearer ' + expiredToken);
    expect(responseEntity.status).toBe(401);
    expect(responseEntity.body.status).toEqual('error');
    expect(responseEntity.body.msg).toEqual('Your token has expired. Please generate a new one');
  });
  test('Should return 200 for an OPTION request', async () => {
    const response = await request(app)
      .options('/v1/auth/login');
    expect(response.status).toBe(200);
  });
});
