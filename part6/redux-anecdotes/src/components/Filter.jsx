import { useDispatch } from "react-redux";
import { setFilter } from "../store";

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <input
        onChange={(event) => {
          dispatch(setFilter(event.target.value));
        }}
      />
    </div>
  );
};

export default Filter;
