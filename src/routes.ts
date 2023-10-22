import { Router } from 'express';
import UserController from './controllers/UserController';
import login from './Auth/login';
import checkToken from './Auth/checkToken';


const routes = Router();

//ROUTES USER

routes.post('/auth/signin', UserController.create);
routes.get('/user/:id',checkToken, UserController.user)

//ROUTES AUTH

routes.post('/auth/login', login)

export default routes;