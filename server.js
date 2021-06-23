// eslint-disable-line
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { rootAPI } from './routes/API/rootAPI.js';

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const isProd = process.env.NODE_ENV === 'production';
dotenv.config({ path: isProd ? '.env.prod' : '.env.dev' });
// eslint-disable-next-line no-console
console.log(`Env loading ${isProd ? 'PROD' : 'DEV'} file`);

app.use(express.json());

app.use('/api', rootAPI);

if (isProd) {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  let result = '';
  try {
    await mongoose.connect(process.env.LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(process.env.PORT, () => {
      result = `Server has been started ${process.env.PORT}`;
      // eslint-disable-next-line no-console
      console.log(result);
    });
  } catch (error) {
    result = `Server error ${error.message}`;
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  return console.log(result);
}
start();
