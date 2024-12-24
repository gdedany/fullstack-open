import express from "express";
import { Response } from "express";

import { getDiagnoses } from "../services/diagnoses";
import { Diagnosis } from "../types";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(getDiagnoses());
});
export default diagnosesRouter;
