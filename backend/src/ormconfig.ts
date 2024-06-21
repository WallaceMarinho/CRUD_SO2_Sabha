import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { User } from './entity/User';
import { Item } from './entity/Item';

export const datasource = new DataSource({
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
})

datasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });
