import l from '../../common/logger';

export interface IEntity {
  id: number;
  name: string;
}

class EntityService {
  public async All(db): Promise<IEntity[]> {
    try {
      const entityList = await db.Entity.findAll();
      l.info(entityList.toString(), 'fetch all entities');
      return entityList;
    } catch (error) {
      l.error(`Error in All from EntityService: ${error}`);
      return null;
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  public async byId(db, id: number): Promise<IEntity> {
    try {
      const entity = await db.Entity.findOne({ where: { id } });
      l.info(`Entity [${entity.id}] = ${entity.name}`, 'Fetch one entity by Id');
      return entity;
    } catch (error) {
      l.error(`Error in byId from EntityService: ${error}`);
      return null;
    }
  }
}
export const entityService = new EntityService();
