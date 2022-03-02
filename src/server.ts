import "reflect-metadata";
import express from 'express';
import './database';
import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(routes);

app.listen(3000, ()=> console.log(`Server ir running on port ${PORT}`));

