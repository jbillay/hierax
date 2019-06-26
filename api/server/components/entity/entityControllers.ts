import { Request, Response } from 'express';
import { IEntity, entityService } from './entityServices';

export class Controller {
  public async all(req: Request, res: Response): Promise<void> {
    const entities: IEntity[] = await entityService.All(res.app.locals.db);
    if (entities) {
      res.jsonp({ status: 'success', entities});
    } else {
      res.jsonp({ status: 'error', msg: 'Cannot get all entities' });
    }
  }
  public async getById(req: Request, res: Response): Promise<void> {
    const entityId: number = parseInt(req.params.id, 0);
    const entity: IEntity = await entityService.byId(res.app.locals.db, entityId);
    if (entity) {
      res.jsonp({ status: 'success', entity });
    } else {
      res.jsonp({ status: 'error', msg: `Cannot get information on entity ${entityId}` });
    }
  }
}
export default new Controller();
