import 'reflect-metadata';
import express from 'express';
import { datasource } from './ormconfig';
import userRoutes from './routes/UserRoutes';
import itemRoutes from './routes/ItemRoutes';
import routes from './routes';

const app = express();
app.use(express.json());

datasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Usar as rotas
    app.use(routes);
    

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
