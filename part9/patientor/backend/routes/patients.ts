import express from "express";
import { Response } from "express";

import {
  addEntry,
  addPatient,
  getNonSensitivePatients,
  getPatient,
} from "../services/patients";
import { NewEntrySchema, NonSensitivePatient } from "../types";
import { toNewPatient } from "../utils";
import { z } from "zod";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
});
patientsRouter.get("/:id", (req, res) => {
  const patientId = req.params.id;
  const patient = getPatient(patientId);
  console.log(patient);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send({ error: "patient not found" });
  }
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const patientId = req.params.id;
    const updatedPatient = addEntry(patientId, newEntry);
    res.send(updatedPatient);
  } catch (error) {
    console.log(error);
  }
});

export default patientsRouter;
