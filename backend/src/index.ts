import express from 'express';
import { rootHandler } from './handlers';
import { router } from './routes'
import cors from 'cors';
import logger from 'morgan'
import mongoose from 'mongoose'
require('dotenv').config();


const URI = process.env.MONGODB_URI || 'mongodb://localhost/Pets'
mongoose
  .connect(URI)
  .then(x => console.log(`Connected to ${x.connections[0].name}`))
  .catch((err) => console.error("Error connecting to Mongo", err))



const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://yeahboi.netlify.app"] //Swap this with the client url 
  })
);
app.use(express.json());
app.use(logger('dev'));

app.get('/', rootHandler);
app.use('/api', router)


const port = process.env.PORT || '8000';
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
}).on("error", console.error)

