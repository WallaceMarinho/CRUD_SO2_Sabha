import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './ormconfig';
import { User } from './entity/User';
import { Item } from './entity/Item';
import { Repository } from 'typeorm';

const app = express();
app.use(express.json());

AppDataSource().then(async (dataSource) => {
  console.log('Data Source has been initialized!');

  // Obtém o repositório para a entidade User e Item
  const userRepository: Repository<User> = dataSource.getRepository(User);
  const itemRepository: Repository<Item> = dataSource.getRepository(Item);

  // Rota para criar um novo usuário
  app.post('/users', async (req, res) => {
    try {
      const newUser = userRepository.create(req.body);
      const savedUser = await userRepository.save(newUser);
      res.json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para atualizar um usuário existente
  app.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      userRepository.merge(user, req.body);
      const updatedUser = await userRepository.save(user);
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para deletar um usuário
  app.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await userRepository.remove(user);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para criar um novo item
  app.post('/items', async (req, res) => {
    try {
      const newItem = itemRepository.create(req.body);
      const savedItem = await itemRepository.save(newItem);
      res.json(savedItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para atualizar um item existente
  app.put('/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const item = await itemRepository.findOne(id);
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
  });

  // Rota para deletar um item
  app.delete('/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const item = await itemRepository.findOne(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await itemRepository.remove(item);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para listar todos os usuários
  app.get('/users', async (req, res) => {
    try {
      const users = await userRepository.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Rota para listar todos os itens
  app.get('/items', async (req, res) => {
    try {
      const items = await itemRepository.find();
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.error('Error during Data Source initialization:', err);
});
