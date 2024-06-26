import { Router } from 'express';
import ItemController  from '../controllers/ItemController';
import { parse } from 'express-form-data';
import tokenValidation from '../utils/tokenValidation';

const formDataMiddleware = parse();

const itemRoutes = Router();

itemRoutes.get('/items', tokenValidation.anyUserVerification, ItemController.listItems);
itemRoutes.post('/items', formDataMiddleware, tokenValidation.anyUserVerification, ItemController.createItem);
itemRoutes.put('/items/:id', formDataMiddleware, tokenValidation.anyUserVerification, ItemController.updateItem);
itemRoutes.delete('/items/:id', tokenValidation.anyUserVerification, ItemController.deleteItem);
itemRoutes.get('/items/:id', tokenValidation.anyUserVerification, ItemController.getByID);

export default itemRoutes;
