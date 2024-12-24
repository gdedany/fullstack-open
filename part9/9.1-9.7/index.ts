import calculateBmi from "./bmiCalculator";
import express from "express";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  }
  const result = calculateBmi(height, weight);
  const response = {
    weight,
    height,
    bmi: result,
  };
  res.send(response);
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily_exercises = req.body.daily_exercises as any;
    const target = req.body.target as any;
    if (!daily_exercises || !target) {
      res.send({ error: "parameters missing" });
    }
    const result = exerciseCalculator(target, daily_exercises);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    } else {
      res.send({ error: "unknown error" });
    }
  }
});
const PORT = 3003;
app.listen(PORT);
