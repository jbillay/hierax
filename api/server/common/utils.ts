import {Request, Response, Router} from 'express';
import l from './logger';

export default Router()
  .get('/', (req: Request, res: Response): void => {
    const db = res.app.locals.db;
    db.sequelize.sync({ force: true })
      .then(() => {
        l.info('Synchronisation Done');
        res.status(200);
        res.jsonp({ status: 'success', msg: 'DB synchronised succesfully' });
      })
      .catch((err) => {
        l.info('Error on sync db : ' + err);
        res.status(500);
        res.jsonp({ status: 'error', msg: 'Error with DB synchronisation' });

      });
  });
