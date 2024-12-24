import { useState } from "react";
import z from "zod";
import {
  EntryType,
  EntryTypeSchema,
  EventType,
  HTMLInput,
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareSchema,
  Patient,
} from "../../types";
import patientsService from "../../services/patients";

const AddEntryForm = ({
  showError,
  patientId,
  onCancel,
  setPatient,
}: {
  showError: (message: string) => void;
  patientId: string;
  onCancel: () => void;
  setPatient: (patient: Patient) => void;
}) => {
  const [entryType, setEntryType] = useState<EntryType>("Hospital");
  const [description, setDescription] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveFrom, setSickLeaveFrom] = useState<string>("");
  const [sickLeaveTo, setSickLeaveTo] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const resetValues = () => {
    setDescription("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveFrom("");
    setSickLeaveTo("");
    setSpecialist("");
    setDate("");
    setDiagnosisCodesInput("");
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
  };

  const selectEntryType = (event: EventType) => {
    const value = event.target.value;
    const type = EntryTypeSchema.parse(value);
    resetValues();
    setEntryType(type);
  };

  const handleValueChange = (
    event: EventType,
    setValue: (value: string) => void
  ) => {
    const target = event.target as HTMLInput;
    const value = target.value;
    setValue(value);
  };

  const addNewEntry = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const formData = {
        type: entryType,
        date: date ? date : undefined,
        description: description ? description : undefined,
        healthCheckRating: healthCheckRating ? healthCheckRating : undefined,
        diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
        specialist: specialist ? specialist : undefined,
        sickLeave:
          sickLeaveTo && sickLeaveFrom
            ? { startDate: sickLeaveTo, endDate: sickLeaveFrom }
            : undefined,
        employerName: employerName ? employerName : undefined,
        discharge:
          dischargeCriteria && dischargeDate
            ? { criteria: dischargeCriteria, date: dischargeDate }
            : undefined,
      };
      switch (entryType) {
        case "Hospital": {
          const validEntry = NewHospitalEntrySchema.parse(formData);
          const updatedPatient = await patientsService.addEntry(
            patientId,
            validEntry
          );
          setPatient(updatedPatient);
          resetValues();
          return;
        }
        case "HealthCheck": {
          const validEntry = NewHealthCheckEntrySchema.parse(formData);
          const updatedPatient = await patientsService.addEntry(
            patientId,
            validEntry
          );
          setPatient(updatedPatient);
          resetValues();
          return;
        }
        case "OccupationalHealthcare": {
          const validEntry = NewOccupationalHealthcareSchema.parse(formData);
          const updatedPatient = await patientsService.addEntry(
            patientId,
            validEntry
          );
          setPatient(updatedPatient);
          resetValues();
          return;
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map((err) => `${err.message} - ${err.path[0]}`)
          .join(", ");
        showError(errorMessage);
      }
      console.log(error);
    }
  };
  const handleAppendDiagnosis = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setDiagnosisCodes(diagnosisCodes.concat(diagnosisCodesInput));
    setDiagnosisCodesInput("");
    console.log(diagnosisCodes);
  };
  return (
    <div>
      <select
        name="entryType"
        defaultValue="Hospital"
        onChange={selectEntryType}
      >
        <option value="Hospital">Hospital Entry</option>
        <option value="HealthCheck">Health Check Entry</option>
        <option value="OccupationalHealthcare">
          Occupational Healthcare Entry
        </option>
      </select>
      <form onSubmit={addNewEntry}>
        <div>
          <label>description </label>
          <input
            type="text"
            value={description}
            onChange={(event) => handleValueChange(event, setDescription)}
          />
        </div>
        <div>
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => handleValueChange(event, setDate)}
          />
        </div>
        {entryType === "HealthCheck" && (
          <div>
            <label>healthcheck rating </label>
            <select
              value={healthCheckRating}
              onChange={(event) =>
                handleValueChange(event, (value) =>
                  setHealthCheckRating(+value)
                )
              }
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        )}
        {entryType === "Hospital" && (
          <div>
            <div>
              <label>discharge date</label>
              <input
                type="date"
                value={dischargeDate}
                onChange={(event) => handleValueChange(event, setDischargeDate)}
              />
            </div>
            <div>
              <label>discharge criteria</label>
              <input
                type="text"
                value={dischargeCriteria}
                onChange={(event) =>
                  handleValueChange(event, setDischargeCriteria)
                }
              />
            </div>
          </div>
        )}
        {entryType === "OccupationalHealthcare" && (
          <div>
            <div>
              <label>employer name</label>
              <input
                type="text"
                value={employerName}
                onChange={(event) => {
                  handleValueChange(event, setEmployerName);
                }}
              />
            </div>
            <div>
              <label>sick leave from </label>
              <input
                type="date"
                value={sickLeaveFrom}
                onChange={(event) => handleValueChange(event, setSickLeaveFrom)}
              />
              <label> to </label>
              <input
                type="date"
                value={sickLeaveTo}
                onChange={(event) => handleValueChange(event, setSickLeaveTo)}
              />
            </div>
          </div>
        )}

        <div>
          <label>specialist</label>
          <input
            type="text"
            value={specialist}
            onChange={(event) => handleValueChange(event, setSpecialist)}
          />
        </div>
        <div>
          <label>add diagnosis codes</label>
          <input
            type="text"
            value={diagnosisCodesInput}
            onChange={(event) =>
              handleValueChange(event, setDiagnosisCodesInput)
            }
          />
          <button
            type="button"
            onClick={(event) => handleAppendDiagnosis(event)}
          >
            append
          </button>
          <div>
            added codes:
            <ul>
              {diagnosisCodes.map((dc, i) => (
                <li key={i}> {dc}</li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit"> add</button>
        <button onClick={onCancel} type="reset">
          cancel
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
