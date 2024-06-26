import 'reflect-metadata';
import express from 'express';
import { datasource } from './ormconfig';
import routes from './routes';
import  cors from 'cors';
import { Request } from 'express';

const app = express();
app.use(express.json());

datasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Usar as rotas e configurações do CORS
    app.use(cors());
    app.use(routes);
    
    // const para rodar os serviçoes  
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
