import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin,
  HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const model = (sequelize: Sequelize) => {
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
  }, {
      tableName: 'Users',
      sequelize, // this bit is important
    });
  return User;
};

module.exports = model;

/*
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
*/
