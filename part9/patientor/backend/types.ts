import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof newPatientSchema>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export type Discharge = z.infer<typeof DischargeSchema>;
export type SickLeave = z.infer<typeof SickLeaveSchema>;

export const DischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

export const SickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareSchema
>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export const BaseEntrySchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});
export const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });
export const NewOccupationalHealthcareSchema =
  OccupationalHealthcareSchema.omit({
    id: true,
  });
export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({
  id: true,
});

export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareSchema,
  HealthCheckEntrySchema,
]);
export const NewEntrySchema = z.union([
  NewHospitalEntrySchema,
  NewOccupationalHealthcareSchema,
  NewHealthCheckEntrySchema,
]);
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
