import express from 'express';
import controller from './userControllers';
export default express.Router()
  .get('/:id', controller.getById)
  .get('/username/:name', controller.getByName)
  .post('/', controller.create);
