import express from "express";

import cors from "cors";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
