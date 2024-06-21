import { Request, Response } from 'express';
import { datasource } from '../ormconfig';
import { Item } from '../entity/Item';

const itemRepository = datasource.getRepository(Item);

interface RequestFiles extends Request {
  files?: any[] | any;
}

class ItemController {

public createItem = async (req: RequestFiles, res: Response) => {
  try {
    const newItem = itemRepository.create(req.body);
    const savedItem = await itemRepository.save(newItem);
    console.log(req.files)
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send('Internal Server Error');
  }
};

public updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemRepository.findOne({ where: { id: Number(id) } });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    itemRepository.merge(item, req.body);
    const updatedItem = await itemRepository.save(item);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
};


public deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemRepository.findOneBy({ id: Number(id) });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await itemRepository.remove(item);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
};


public listItems = async (req: Request, res: Response) => {
  try {
    const items = await itemRepository.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
 }
};

export default new ItemController();
