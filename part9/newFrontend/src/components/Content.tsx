import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part, i) => {
    return (
      <div key={i}>
        <Part part={part} />
      </div>
    );
  });
};
export default Content;
