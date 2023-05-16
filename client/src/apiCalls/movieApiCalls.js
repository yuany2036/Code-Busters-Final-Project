import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../data/context';

axios.defaults.baseURL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? 'https://entscape-backend.onrender.com'
    : 'http://localhost:4000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const getMoviesByTitle = async (searchTerm, setState) => {
  const { backendURL } = useContext(DataContext);
  try {
    const response = await axios.get(
      `${backendURL}/movies/?title=${searchTerm}`
    );
    setState(response.data);
  } catch (error) {
    console.error(error);
  }
};

/* export const fetchMovieRecommendations = async (dispatch,setState) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/movies/recommend`
    );
    setState(response.data);
  } catch (error) {
    console.log(error);
  }
} */
