import { useNavigate, Link } from "react-router-dom";

function HomePage({ moviesList, dispatch }) {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/add">Add Movie</Link>
      <ul>
        {moviesList.map((movie) => (
          <>
            <div onClick={() => navigate("/movies/" + movie.id)}>
              <li key={movie.id}>{movie.id}</li>
              <li>{movie.title}</li>
              <li>{movie.rating}</li>
              <li>{movie.language}</li>
            </div>
            <button
              onClick={() =>
                dispatch({ type: "deleteMovie", payload: movie.id })
              }
            >
              Delete Movie
            </button>
            <button
              onClick={() => {
                dispatch({ type: "editMovie", payload: movie.id });
                navigate("/add");
                console.log(movie.id);
              }}
            >
              Edit Movie
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
