import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>{part.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>

          <p>project count: {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>{part.description}</p>

          <p>background material: {part.backgroundMaterial}</p>
        </>
      );
  }
};
export default Part;
