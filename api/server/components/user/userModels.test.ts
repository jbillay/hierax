import '../../common/env';
import { Sequelize } from 'sequelize';

const config = process.env.DATABSE_CONNECTION_URI;
const sequelize = new Sequelize(config);

test('Check User Model', () => {
  const UserModel = sequelize.import('./userModels');
  expect(UserModel.getTableName()).toEqual('Users');
});
