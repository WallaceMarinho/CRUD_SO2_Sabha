import { Router } from 'express';
import itemRoutes from './ItemRoutes';
import userRoutes from './UserRoutes';

const routes = Router();

routes.use(itemRoutes)
routes.use(userRoutes)

export default routes;
