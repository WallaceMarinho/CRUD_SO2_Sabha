import { Router } from 'express';
import ItemController  from '../controllers/ItemController';
import { parse } from 'express-form-data';

const formDataMiddleware = parse();

const itemRoutes = Router();

itemRoutes.get('/items', ItemController.listItems);
itemRoutes.post('/items',formDataMiddleware, ItemController.createItem);
itemRoutes.put('/items/:id', ItemController.updateItem);
itemRoutes.delete('/items/:id', ItemController.deleteItem);

export default itemRoutes;
