import { useParams } from "react-router-dom";

function MovieDetails({ moviesList }) {
  const { id } = useParams();
  const SelectedMovie = moviesList.find((movie) => movie.id === +id);
  return <div>{SelectedMovie.title}</div>;
}

export default MovieDetails;
