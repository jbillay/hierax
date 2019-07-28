import express from 'express';
import controller from './companyHouseControllers';
export default express.Router().post('/', controller.search);
