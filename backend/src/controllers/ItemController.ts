import { Request, Response } from 'express';
import { datasource } from '../ormconfig';
import { Item } from '../entity/Item';
import { uploadImg } from '../utils/imageUploader';

const itemRepository = datasource.getRepository(Item);

interface RequestFiles extends Request {
  files?: any[] | any;
}

class ItemController {

public createItem = async (req: RequestFiles, res: Response) => {
  try {
    const {img} = req.files as any
    const imageUrl = await uploadImg(img);
    const newItem = itemRepository.create({...req.body,imageUrl});
    const savedItem = await itemRepository.save(newItem);
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send('Internal Server Error');
  }
};

public updateItem = async (req: RequestFiles, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemRepository.findOne({ where: { id: Number(id) } });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const {img} = req.files as any
    if (img) {
      const imageUrl = await uploadImg(img);
      itemRepository.merge(item, {...req.body,imageUrl});
    }
    else{
      itemRepository.merge(item, {...req.body});
    }
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
    res.json(items.filter(item => item.stockQuantity >= item.minimumStock));
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
 }

 public getByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemRepository.findOneBy({ id: Number(id) });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(item)
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
 }

};


export default new ItemController();