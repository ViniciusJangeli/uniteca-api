
import express from 'express'
import { routes } from './routes'
import cors from 'cors';

const app = express()

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(routes);

app.listen(3001, () => console.log("Server is running in port 3001"))