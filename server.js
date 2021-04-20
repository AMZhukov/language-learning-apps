import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { rootAPI } from "./routes/API/rootAPI.js";


const app = express();
const __dirname = path.resolve();

const isProd = process.env.NODE_ENV === "production";
dotenv.config({ path: isProd ? ".env.prod" : ".env.dev" });
console.log(`Env loading ${isProd ? "PROD" : "DEV"} file`);

app.use(express.json({ extended: true }));

app.use("api", rootAPI);

if (isProd) {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(process.env.LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server has been started ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Server error ${error.message}`);
    process.exit(1);
  }
}

start();
