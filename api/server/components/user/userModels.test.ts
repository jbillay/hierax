import '../../common/env';
import Sequelize from 'sequelize';
import * as userModel from './userModels';

const config = process.env.DATABSE_CONNECTION_URI;
const sequelize = new Sequelize(config);

test('Check User Model', () => {
  const UserModel: Sequelize.Model<
    userModel.UserInstance,
    userModel.IUser
  > = userModel.ModelFactory(sequelize, Sequelize);
  expect(UserModel.getTableName()).toEqual('Users');
});
