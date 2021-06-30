// eslint-disable-line
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { rootAPI } from './routes/API/rootAPI.js';
import { errorMiddleware } from './middlewares/error-middleware.js';

const app = express();

const __dirname = path.resolve(); // eslint-disable-line no-underscore-dangle

const isProd = process.env.NODE_ENV === 'production';

console.log(`Env loading ${isProd ? 'PROD' : 'DEV'} file`); // eslint-disable-line no-console

app.use(express.json());
app.use(cookieParser());

app.use('/api', rootAPI);

if (isProd) {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use(errorMiddleware);

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
