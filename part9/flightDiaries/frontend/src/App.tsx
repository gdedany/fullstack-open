import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import diaryService from "./services/diaries";
import z from "zod";
const App = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const handleAdd = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = {
        date: z.string().date().parse(date),
        visibility: z.nativeEnum(Visibility).parse(visibility),
        weather: z.nativeEnum(Weather).parse(weather),
        comment: z.string().optional().parse(comment),
      };
      diaryService
        .create(newEntry)
        .then((response) => {
          setDiaries(diaries.concat(response));
          setErrorMessage("");
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(`Error: ${error.response.data.error}`);
          }
        });
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  useEffect(() => {
    diaryService.getAll().then((response) => setDiaries(response));
  }, []);
  return (
    <div>
      {errorMessage}
      <h2>Add new entry</h2>
      <form onSubmit={handleAdd}>
        <label>date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        <fieldset>
          <legend>visibility</legend>

          <div>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label>great</label>
          </div>
          <div>
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label>good</label>
          </div>
          <div>
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label>poor</label>
          </div>
        </fieldset>
        <br />
        <fieldset>
          <legend>weather</legend>
          <div>
            <label>rainy</label>
            <input
              type="radio"
              value="rainy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
          </div>
          <div>
            <label>cloudy</label>
            <input
              type="radio"
              value="cloudy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
          </div>
          <div>
            <label>stormy</label>
            <input
              type="radio"
              value="stormy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
          </div>
          <div>
            <label>windy</label>
            <input
              type="radio"
              value="windy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
          </div>
        </fieldset>

        <br />
        <label>comment</label>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <h2>diary entries</h2>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <h4>{d.date}</h4>
            visibility: {d.visibility}
            <br />
            weather: {d.weather}
          </div>
        );
      })}
    </div>
  );
};

export default App;
