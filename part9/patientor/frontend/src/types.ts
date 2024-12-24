import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type EventType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type HTMLInput = HTMLSelectElement | HTMLInputElement;

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

export const DischargeSchema = z.object({
  date: z.string().date().min(1, { message: "discharge date is required" }),
  criteria: z.string().min(1, { message: "discharge criteria is required" }),
});

export const SickLeaveSchema = z.object({
  startDate: z
    .string()
    .date()
    .min(1, { message: "sick leave start date is required" }),
  endDate: z
    .string()
    .date()
    .min(1, { message: "sick leave end date is required" }),
});

export type Discharge = z.infer<typeof DischargeSchema>;

export type SickLeave = z.infer<typeof SickLeaveSchema>;

export const BaseEntrySchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().date().min(1, { message: "date is required" }),
  specialist: z.string().min(1, { message: "specialist is required" }),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z
    .nativeEnum(HealthCheckRating)
    .refine((val) => val !== undefined && val !== null, {
      message: "health rating is a required field",
    }),
});

export const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, { message: "employer name is required" }),
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

export const EntryTypeSchema = z.union([
  z.literal("Hospital"),
  z.literal("OccupationalHealthcare"),
  z.literal("HealthCheck"),
]);

export type EntryType = z.infer<typeof EntryTypeSchema>;

export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareSchema,
  HealthCheckEntrySchema,
]);

export type Entry = z.infer<typeof EntrySchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
