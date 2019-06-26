import express from 'express';
import controller from './entityControllers';
export default express.Router()
  .get('/', controller.all)
  .get('/:id', controller.getById);
