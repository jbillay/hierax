import '../../common/env';
import request from 'supertest';
import Server from '../../common/server';
import routes from '../../routes';
import { Application } from 'express';
import ExpressServer from '../../common/server';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('routes: company house index', () => {
  test('should respond as expected', async () => {
    const resp = {
      status: 200, data: {
        items: [
          {
            address_snippet: 'test London',
            company_number: '12657893',
            date_of_cessation: null,
            description: 'test company 1',
            date_of_creation: '12/10/1981',
            company_type: 'ltd',
            title: 'JB Ltd',
            company_status: 'Nearly dead',
          },
          {
            address_snippet: 'test Paris',
            company_number: '9874276384',
            date_of_cessation: null,
            description: 'test company 2',
            date_of_creation: '12/10/1988',
            company_type: 'ltd',
            title: 'EFB Ltd',
            company_status: 'Dead again',
          },
        ],
      },
    };
    mockedAxios.get.mockResolvedValue(resp);
    const response = await request(app).post('/v1/auth/login').send({
      username: 'jbillay@gmail.com',
      password: 'noofs',
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('success');
    const token = response.body.user.token;
    const responseCH = await request(app).post('/v1/companyHouse')
      .send({ companyName: 'HSBC' })
      .set('Authorization', 'Bearer ' + token);
    expect(responseCH.status).toBe(200);
    expect(responseCH.body.status).toEqual('success');
    expect(responseCH.body.companiesInfo).toEqual(resp.data);
  });
});
