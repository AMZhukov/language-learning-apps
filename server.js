import express from "express";
import path from 'path';
import dotenv from 'dotenv';

const server = express();
const __dirname = path.resolve();



server.listen(5000, () => {
  console.log("server has been started on 5000 port");
});
