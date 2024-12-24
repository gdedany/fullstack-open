import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import Entries from "./Entries";
import AddEntryForm from "./AddEntryForm";
import { Alert } from "@mui/material";
const PatientPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [patient, setPatient] = useState<Patient>();
  const patientId = params.id;
  const hideEntryForm = () => {
    setShowEntryForm(!showEntryForm);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };
  useEffect(() => {
    const getPatient = async (id: string) => {
      const response = await patientsService.getOne(id);
      setPatient(response);
    };
    if (patientId) {
      getPatient(patientId);
    }
  }, [patientId]);
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}, {patient.gender}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        {errorMessage && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        {showEntryForm && patientId && (
          <AddEntryForm
            showError={showError}
            setPatient={(value) => setPatient(value)}
            patientId={patientId}
            onCancel={hideEntryForm}
          />
        )}
        {!showEntryForm && <button onClick={hideEntryForm}>add entry</button>}
        <div>{patient.entries && <Entries entries={patient.entries} />}</div>
      </div>
    );
  } else {
    return <div>user not found</div>;
  }
};
export default PatientPage;
