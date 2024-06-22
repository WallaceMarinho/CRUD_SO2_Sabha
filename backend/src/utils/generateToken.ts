import {sign} from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

const generateToken = (userData: any) => {
  const token = sign(userData,`${process.env.SECRET}` ); // Você pode ajustar o tempo de expiração conforme necessário
  return token;
};

export default generateToken;