import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MovieForm({ dispatch, editMovie }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [watched, setWatched] = useState(false);

  function handleSubmit(e) {
    console.log("Before editing", editMovie);
    e.preventDefault();

    const movieData = {
      title,
      rating,
      language,
      watched,
    };
    if (editMovie.id) {
      console.log("Updating Movie");
      dispatch({
        type: "updateMovie",
        payload: { ...movieData, id: editMovie.id },
      });
      navigate("/");
    } else {
      console.log("Adding movie");
      dispatch({ type: "addMovie", payload: movieData });
      console.log(movieData);
      navigate("/");
    }
  }
  useEffect(() => {
    if (editMovie.id) {
      //eslint-disable-next-line
      setTitle(editMovie.title);
      setRating(editMovie.rating);
      setLanguage(editMovie.language);
      setWatched(editMovie.watched);
    }
  }, [editMovie]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div>
        <label>Language</label>
        <input value={language} onChange={(e) => setLanguage(e.target.value)} />
      </div>

      <div>
        <label>
          Watched
          <input
            type="checkbox"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        </label>
      </div>

      <button type="submit">{editMovie.id ? "Edit Movie" : "Add Movie"}</button>
    </form>
  );
}

export default MovieForm;
