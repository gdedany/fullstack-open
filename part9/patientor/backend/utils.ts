import { NewPatient, newPatientSchema } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};
