import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//eslint-disable-next-line
function MovieForm({ dispatch, editMovie, moviesList }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = moviesList.find((movie) => movie.id === +id);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [watched, setWatched] = useState(false);

  function handleSubmit(e) {
    // console.log("Before editing", editMovie);
    e.preventDefault();

    const movieData = {
      title,
      rating,
      language,
      watched,
    };
    if (movie) {
      console.log("Updating Movie");
      dispatch({
        type: "updateMovie",
        payload: { ...movieData, id: +id },
      });
      navigate("/");
    } else {
      console.log("Adding movie");
      dispatch({ type: "addMovie", payload: movieData });
      // console.log(movieData);
      navigate("/");
    }
  }
  useEffect(() => {
    if (movie) {
      //eslint-disable-next-line
      setTitle(movie.title);
      setRating(movie.rating);
      setLanguage(movie.language);
      setWatched(movie.watched);
    }
  }, [movie]);

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

      <button type="submit">{movie ? "Edit Movie" : "Add Movie"}</button>
    </form>
  );
}

export default MovieForm;
