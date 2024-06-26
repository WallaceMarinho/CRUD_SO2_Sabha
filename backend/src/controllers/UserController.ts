import { Request, Response } from 'express';
import { datasource } from '../ormconfig';
import { User } from '../entity/User';
import generateToken from '../utils/generateToken';

const userRepository = datasource.getRepository(User);

class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const newUser = userRepository.create(req.body);
      const savedUser = await userRepository.save(newUser);
      res.json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne({ where: { id: Number(id) } });

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
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userRepository.remove(user);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  public listUsers = async (req: Request, res: Response) => {
    try {
      const users = await userRepository.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user by id:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  public async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const usuarioEncontrado = await userRepository.findOne({ where: { email } });

      if (!usuarioEncontrado || usuarioEncontrado.password !== senha) {
        return res.status(401).json({ error: 'Login e senha incorretos' });
      }

      const token = generateToken({ ...usuarioEncontrado });
      return res.json({ usuario: usuarioEncontrado, token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
}

export default new UserController();
