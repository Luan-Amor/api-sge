import dotenv from 'dotenv'
import "reflect-metadata";
import express from 'express';
import './database';
import { routes } from "./routes";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, ()=> console.log(`Server ir running on port ${PORT}`));

