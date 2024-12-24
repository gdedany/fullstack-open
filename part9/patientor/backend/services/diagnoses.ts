import { Diagnosis } from "../types";
import diagnoses from "../data/diagnoses";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
