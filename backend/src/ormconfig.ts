// configurações do banco de dados em nuvem
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Item } from './entity/Item';

export const datasource = new DataSource({
  // tipo de banco e ipV4 público da VM
  type: 'mysql',
  host: '54.91.6.202',
  // porta, usuário, senha, nome do banco de dados e outras configurações
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'sabhabd',
  synchronize: false,
  logging: false,
  entities: [User, Item],
  migrations: [],
  subscribers: [],
  connectTimeout: 10000, // 10 seconds
  extra: {
    connectionLimit: 10,
  },
});
// const para iniciar o banco de dados
datasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });