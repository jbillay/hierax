import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {  HasManyGetAssociationsMixin, HasManyAddAssociationMixin,
          HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin,
          HasManyCreateAssociationMixin } from 'sequelize';

class Entity extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const model = (sequelize: Sequelize) => {
  Entity.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    } }, {
        tableName: 'Entities',
        sequelize, // this bit is important
  });
  return Entity;
};

module.exports = model;
