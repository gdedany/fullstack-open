import { v1 as uuid } from "uuid";
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
import patients from "../data/patients";
export const getPatients = (): Patient[] => {
  return patients;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, dateOfBirth, gender }) => ({
    id,
    name,
    occupation,
    dateOfBirth,
    gender,
  }));
};

export const getPatient = (patientId: string): Patient | null => {
  return patients.find((p) => p.id === patientId) || null;
};

export const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...newPatient,
    entries: [],
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const addEntry = (patientId: string, newEntry: NewEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...newEntry,
  };
  const oldPatient = patients.find((p) => p.id === patientId) || null;
  if (!oldPatient) {
    throw new Error("malformatted patient id");
  }
  oldPatient.entries.push(newPatientEntry);
  return oldPatient;
};
