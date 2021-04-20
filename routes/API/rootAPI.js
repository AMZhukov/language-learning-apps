import { Router } from "express";

export const rootAPI = Router();

rootAPI.get("/registration", (req, res) => {
  console.log(123);
  res.status(200).json("ANSWER FROM ROUTE REGISTRATION");
});
