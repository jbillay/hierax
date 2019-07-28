import fs from 'fs';
import path from 'path';
import l from './logger';
import { DataTypes } from 'sequelize/types';

export interface Database {
  Sequelize: any;
  sequelize: any;
}

export class DataLayer {
  public test: string;
  protected database: Database;

  constructor(Sequelize) {
    const config = process.env.DATABSE_CONNECTION_URI;
    const sequelize = new Sequelize(config);
    this.database = {
      Sequelize,
      sequelize,
    };
  }

  public async connection(): Promise<DataLayer> {
    return new Promise((resolve, reject) => {
      this.database.sequelize.authenticate()
        .then(() => {
          l.info('Connection has been established successfully.');
          resolve(this);
        })
        .catch((err: any) => {
          l.error('Unable to connect to the database:', err);
          reject(null);
        });
    });
  }

  public async init(): Promise<Database> {
    return new Promise((resolve, reject) => {
      const baseDir: string = `${__dirname}/../components/`;
      const regex = new RegExp('Models.ts$');
      fs
        .readdirSync(path.join(baseDir))
        .forEach((dir) => {
          if (fs.statSync(path.join(baseDir, dir)).isDirectory()) {
            fs.readdirSync(path.join(baseDir, dir))
              .filter((file) => {
                return (file.indexOf('.') !== 0) && (file !== 'index.js') && (regex.test(file));
              })
              .forEach((file) => {
                const model = this.database.sequelize.import(path.join(baseDir, dir, file));
                console.log(model);
                l.info(model.name + ' model loaded');
                this.database[model.name] = model;
              });
          }
        });
      /* TODO: To be activated when association will be created
      Object.keys(this.database).forEach((modelName) => {
        if ('associate' in this.database[modelName]) {
          l.info(modelName + ' model association done');
          this.database[modelName].associate(this.database);
        }
      });
      */
      resolve(this.database);
    });
  }
}
