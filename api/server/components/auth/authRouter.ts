import express from 'express';
import controller from './authControllers';
export default express.Router().post('/login', controller.login);
