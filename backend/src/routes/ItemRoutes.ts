import { Router } from 'express';
import ItemController  from '../controllers/ItemController';
import { parse } from 'express-form-data';
import tokenValidation from '../utils/tokenValidation';

const formDataMiddleware = parse();

const itemRoutes = Router();

itemRoutes.get('/items', tokenValidation.anyUserVerification, ItemController.listItems);
itemRoutes.post('/items', tokenValidation.anyUserVerification,formDataMiddleware, ItemController.createItem);
itemRoutes.put('/items/:id', tokenValidation.anyUserVerification, ItemController.updateItem);
itemRoutes.delete('/items/:id', tokenValidation.anyUserVerification, ItemController.deleteItem);

export default itemRoutes;
