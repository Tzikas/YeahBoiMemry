import express from 'express';
import { rootHandler, helloHandler, signupHandler } from './handlers';
import cors from 'cors';
import logger from 'morgan'
import mongoose from 'mongoose'
require('dotenv').config();


const URI = process.env.MONGODB_URI || 'mongodb://localhost/Toro'
mongoose
    .connect(URI)
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch(() => console.error("Error connecting to Mongo"))



const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://clientnetlify.netlify.app"] //Swap this with the client url 
  })
);
app.use(express.json());
app.use(logger('dev'));



app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);
app.post('/api/signup', signupHandler)

app.use('/api', require('./routes.ts'))


const port = process.env.PORT || '8000';
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
}).on("error", console.error) 

