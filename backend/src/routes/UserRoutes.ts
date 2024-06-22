import { Router } from 'express';
import UserController from '../controllers/UserController';
import tokenValidation from '../utils/tokenValidation';
const userRoutes = Router();

userRoutes.get('/users', tokenValidation.anyUserVerification,UserController.listUsers);
userRoutes.post('/users', tokenValidation.anyUserVerification,UserController.createUser);
userRoutes.put('/users/:id', tokenValidation.anyUserVerification,UserController.updateUser);
userRoutes.delete('/users/:id', tokenValidation.anyUserVerification,UserController.deleteUser);
userRoutes.post('/users/login',UserController.login);

export default userRoutes;
