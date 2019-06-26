import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../common/typings/SequelizeAttribute';

export interface EntityAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EntityInstance
  extends Sequelize.Instance<EntityAttributes>,
  EntityAttributes {}

export const ModelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<EntityInstance, EntityAttributes> => {
  const attributes: SequelizeAttributes<EntityAttributes> = {
    name: {
      type: DataTypes.STRING,
    },
  };

  const Entity = sequelize.define<EntityInstance, EntityAttributes>(
    'Entity',
    attributes,
  );

  // Example of associttion
  // Entity.associate = (models) => {
  //   Entity.hasMany(models.Comment);
  //   Entity.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
  // };

  return Entity;
};
