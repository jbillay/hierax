import { DataLayer, Database } from '../server/common/db';
// import SequelizeMock from 'sequelize-mock';
import { Sequelize } from 'sequelize';

beforeAll(() => {
  process.env.DATABSE_CONNECTION_URI = 'sqlite:./test/test.db';
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
    const dbLayer: DataLayer = new DataLayer(Sequelize);
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
    const dbLayer: DataLayer = new DataLayer(Sequelize);
    const dbConnect: DataLayer = await dbLayer.connection();
    const database: Database = await dbConnect.init();
    expect(database.sequelize.models.User.tableName).toEqual('Users');
  });
});
