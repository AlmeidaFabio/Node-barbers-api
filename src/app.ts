require('dotenv').config();
import 'reflect-metadata';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import path from 'path';
import createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(urlencoded({ extended:true }));
app.use(json());

app.use('/api', router);

export { app };