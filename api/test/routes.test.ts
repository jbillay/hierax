import '../server/common/env';
import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import { Application } from 'express';
import ExpressServer from '../server/common/server';

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
    // tslint:disable-next-line:max-line-length
    const expiredToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjE1ODQwMzksInVzZXJuYW1lIjoiamJpbGxheUBnbWFpbC5jb20ifQ.LdgdQJ2TcIE9MDBnk_dW13uPtMIvFIu7LwM_NGNKbEs';
    const responseEntity = await request(app)
      .get('/v1/entity')
      .set('Authorization', 'Bearer ' + expiredToken);
    expect(responseEntity.status).toBe(401);
    expect(responseEntity.body.status).toEqual('error');
    expect(responseEntity.body.msg).toEqual('Your token has expired. Please generate a new one');
  });
});
