import { IEntity, entityService } from './entityServices';

describe('Test Entity Service', () => {
  describe('Test Entity Service All', () => {
    test('Should get all entities', async () => {
      const db: any = {
        Entity: {
          async findAll() {
            return new Promise((resolve, reject) => {
              resolve([{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }]);
            });
          },
        },
      };
      const entities: IEntity[] = await entityService.All(db);
      expect(entities).toEqual([{ id: 1, name: 'Jeremy Ltd.' }, { id: 2, name: 'SG' }]);
    });
    test('Should fail to get all entities', async () => {
      const db: any = {
        Entity: {
          async findAll() {
            return new Promise((resolve, reject) => {
              reject(null);
            });
          },
        },
      };
      const entities: IEntity[] = await entityService.All(db);
      expect(entities).toBeNull();
    });
  });
  describe('Test Entity Service byId', () => {
    test('Should get an entity with Id 1', async () => {
      const db: any = {
        Entity: {
          async findOne(config: any) {
            return new Promise((resolve, reject) => {
              resolve({ id: 1, name: 'Jeremy Ltd.' });
            });
          },
        },
      };
      const entity: IEntity = await entityService.byId(db, 1);
      expect(entity.id).toBe(1);
      expect(entity.name).toEqual('Jeremy Ltd.');
    });
    test('Should fail to get all entities', async () => {
      const db: any = {
        Entity: {
          async findAll() {
            return new Promise((resolve, reject) => {
              reject(null);
            });
          },
        },
      };
      const entity: IEntity = await entityService.byId(db, 1);
      expect(entity).toBeNull();
    });

  });
});
