import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../common/typings/SequelizeAttribute';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance
  extends Sequelize.Instance<IUser>,
  IUser { }

export const ModelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<UserInstance, IUser> => {
  const attributes: SequelizeAttributes<IUser> = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
  };

  const User = sequelize.define<UserInstance, IUser>(
    'User',
    attributes,
  );

  // Example of associttion
  // User.associate = (models) => {
  //   User.hasMany(models.Comment);
  //   User.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  // };

  return User;
};
