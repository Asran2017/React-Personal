import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieForm from "./pages/MovieForm";
import MovieDetails from "./pages/MovieDetails";
import { useReducer } from "react";

const initialState = {
  moviesList: [
    {
      id: 1,
      title: "Inception",
      rating: 9,
      language: "English",
      watched: true,
    },
    {
      id: 2,
      title: "Interstellar",
      rating: 8.7,
      language: "English",
      watched: false,
    },
    {
      id: 3,
      title: "3 Idiots",
      rating: 8.4,
      language: "Hindi",
      watched: true,
    },
  ],
  editingMovie: {},
};
const reducer = (state, action) => {
  console.log("Action recieved,action");
  switch (action.type) {
    case "addMovie":
      // if (state.moviesList.some((elt) => elt.title === action.payload.title))
      //   return state;
      return {
        ...state,
        moviesList: [
          ...state.moviesList,
          {
            title: action.payload.title,
            rating: action.payload.rating,
            language: action.payload.language,
            watched: action.payload.watched,
            id: Date.now(),
          },
        ],
      };
    case "deleteMovie":
      return {
        ...state,
        moviesList: state.moviesList.filter(
          (movie) => movie.id !== action.payload,
        ),
      };
    case "editMovie":
      console.log(action.payload);
      return {
        ...state,
        editingMovie: state.moviesList.find(
          (movie) => movie.id === action.payload,
        ),
      };
    case "updateMovie":
      return {
        ...state,
        moviesList: state.moviesList.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie,
        ),
        editingMovie: {},
      };
  }
  // console.log(state.moviesList);
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { moviesList, editingMovie } = state;
  console.log(moviesList);
  return (
    <div>
      <h1>App Page</h1>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<HomePage moviesList={moviesList} dispatch={dispatch} />}
          />

          <Route
            path="add"
            element={<MovieForm dispatch={dispatch} editMovie={editingMovie} />}
          />
          <Route
            path="movies/:id"
            element={<MovieDetails moviesList={moviesList} />}
          />
          <Route
            path="/edit/:id"
            element={<MovieForm moviesList={moviesList} dispatch={dispatch} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
