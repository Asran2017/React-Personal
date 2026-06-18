import { useNavigate, useParams } from "react-router-dom";

function MovieDetails({ moviesList }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const SelectedMovie = moviesList.find((movie) => movie.id === +id);
  return (
    <div>
      <h1>{SelectedMovie.title}</h1>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit Movie</button>
    </div>
  );
}

export default MovieDetails;
