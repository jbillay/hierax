import './server/common/env';
import { DataLayer, Database } from './server/common/db';
import l from './server/common/logger';
import Server from './server/common/server';
import routes from './server/routes';
import fs from 'fs';
import os from 'os';
import path from 'path';
import https from 'https';
import ExpressServer from './server/common/server';
import Sequelize from 'sequelize';

(async () => {
  try {
    const port = parseInt(process.env.PORT, 0);
    const dbLayer: DataLayer = new DataLayer(Sequelize);
    const dbConnect: DataLayer = await dbLayer.connection();
    const database: Database = await dbConnect.init();
    const server: ExpressServer = new Server(database);
    const app = await server.router(routes);

    const httpsOptions = {
      key: fs.readFileSync(path.normalize(__dirname + '/server/config/key.pem')),
      cert: fs.readFileSync(path.normalize(__dirname + '/server/config/cert.pem')),
    };

    // tslint:disable-next-line:max-line-length
    const welcome = (portStarted: string | number) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV || 'development'}
     @: ${os.hostname()} on port: ${portStarted}}`,
      );
    https.createServer(httpsOptions, app).listen(port, welcome(port));
  } catch (err) {
    l.error(err);
  }
})();
