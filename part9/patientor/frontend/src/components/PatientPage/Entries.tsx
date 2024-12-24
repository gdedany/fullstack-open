import { Entry } from "../../types";
const Entries = ({ entries }: { entries: Entry[] }) => {
  if (entries && entries.length > 0)
    return (
      <div>
        {entries.map((e) => {
          switch (e.type) {
            case "HealthCheck": {
              return (
                <ul
                  style={{
                    border: "solid 1px black",
                    borderRadius: "5px",
                    padding: "1.5rem",
                  }}
                  key={e.id}
                >
                  <li>{e.date} | Health Check </li>
                  <li>{e.description}</li>
                  <li>Health rating: {e.healthCheckRating}</li>
                  <li>Diagnose by:{e.specialist}</li>
                </ul>
              );
            }
            case "OccupationalHealthcare": {
              return (
                <ul
                  style={{
                    border: "solid 1px black",
                    borderRadius: "5px",
                    padding: "1.5rem",
                  }}
                  key={e.id}
                >
                  <li>
                    {e.date} | Occuptational Health Check | {e.employerName}{" "}
                  </li>
                  <li>{e.description}</li>
                  {e.sickLeave && (
                    <li>
                      sick leave: {e.sickLeave.startDate} -{" "}
                      {e.sickLeave.endDate}
                    </li>
                  )}

                  {e.diagnosisCodes && (
                    <li>Diagnoses: {e.diagnosisCodes.join(", ")}</li>
                  )}

                  <li>Diagnose by:{e.specialist}</li>
                </ul>
              );
            }
            case "Hospital": {
              return (
                <ul
                  style={{
                    border: "solid 1px black",
                    borderRadius: "5px",
                    padding: "1.5rem",
                  }}
                  key={e.id}
                >
                  <li> {e.date} | Hospital Check</li>
                  <li> {e.description}</li>
                  <li>
                    {e.discharge && (
                      <div>
                        discharge: {e.discharge.criteria} - {e.discharge.date}
                      </div>
                    )}
                  </li>
                  <li>
                    {e.diagnosisCodes && (
                      <div>Diagnoses: {e.diagnosisCodes.join(", ")}</div>
                    )}
                  </li>
                  <li>Diagnose by:{e.specialist}</li>
                </ul>
              );
            }
          }
        })}
      </div>
    );
};
export default Entries;
