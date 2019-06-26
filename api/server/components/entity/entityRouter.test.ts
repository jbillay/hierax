import '../../common/env';
import request from 'supertest';
import Server from '../../common/server';
import routes from '../../routes';
import { Application } from 'express';
import ExpressServer from '../../common/server';

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
  Entity: {
    async findAll() {
      return new Promise((resolve, reject) => {
        resolve([{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }]);
      });
    },
    async findOne(config: any) {
      return new Promise((resolve, reject) => {
        resolve({ id: 1, name: 'Jeremy Ltd.' });
      });
    },
  },

};
let app: Application;

beforeAll(async () => {
  const server: ExpressServer = new Server(db);
  app = await server.router(routes);
});

describe('Test Routes: Entity', () => {
  test('Should return all existing entities', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      username: 'jbillay@gmail.com',
      password: 'noofs',
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    const token = response.body.user.token;
    const responseEntity = await request(app)
      .get('/v1/entity')
      .set('Authorization', 'Bearer ' + token);
    expect(responseEntity.status).toBe(200);
    expect(responseEntity.body.status).toEqual('success');
    expect(responseEntity.body.entities).toEqual([{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }]);
  });
  test('Should return entity 1', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      username: 'jbillay@gmail.com',
      password: 'noofs',
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    const token = response.body.user.token;
    const responseEntity = await request(app)
      .get('/v1/entity/1')
      .set('Authorization', 'Bearer ' + token);
    expect(responseEntity.status).toBe(200);
    expect(responseEntity.body.status).toEqual('success');
    expect(responseEntity.body.entity).toEqual({ id: 1, name: 'Jeremy Ltd.' });
  });
});
