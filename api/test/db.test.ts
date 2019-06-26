import { DataLayer, Database } from '../server/common/db';
import SequelizeMock from 'sequelize-mock';
import { resolve } from 'bluebird';

beforeAll(() => {
  process.env.DATABSE_CONNECTION_URI = 'mysql://localhost:localhost@localhost-db:3306/hierax';
});

class SequelizeFailConnect {
  constructor(test: any) {
    return this;
  }
  public authenticate() {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      reject(null);
    });
  }
}

describe('Unit Test DB: Test Connection', () => {
  test('Database should be connecting', async () => {
    const dbLayer: DataLayer = new DataLayer(SequelizeMock);
    const dbConnect: DataLayer = await dbLayer.connection();
    expect(dbConnect).toBeDefined();
  });
  test('Database should fail to connect', async () => {
    const dbLayer: DataLayer = new DataLayer(SequelizeFailConnect);
    try {
      const dbConnect: DataLayer = await dbLayer.connection();
    } catch (err) {
      expect(err).toBeNull();
    }
  });
});

describe('Unit Test DB: Test Initialisation', () => {
  test('Database should load models', async () => {
    const dbLayer: DataLayer = new DataLayer(SequelizeMock);
    const dbConnect: DataLayer = await dbLayer.connection();
    const database: Database = await dbConnect.init();
    console.log(database.Sequelize.User);
  });
});
