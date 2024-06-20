import { createConnection } from 'typeorm';
import { User } from './entity/User';
import {Item} from './entity/Item'

export const AppDataSource = async () => {
  return await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'SabhaBD',
    synchronize: false,
    logging: false,
    entities: [User, Item],
    migrations: [],
    subscribers: [],
  });
};
