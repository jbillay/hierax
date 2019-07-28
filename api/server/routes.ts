import { Application } from 'express';
import utilsRouter from './common/utils';
import entityRouter from './components/entity';
import userRouter from './components/user';
import authRouter from './components/auth';
import companyHouseRouter from './components/companyHouse';

export default function routes(app: Application): void {
  // TODO: To be removed
  app.use('/v1/syncDb', utilsRouter);
  app.use('/v1/auth', authRouter);
  app.use('/v1/user', userRouter);
  app.use('/v1/entity', entityRouter);
  app.use('/v1/companyHouse', companyHouseRouter);
}
