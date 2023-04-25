import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const getMoviesByTitle = async (searchTerm, setState) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/movies/?title=${searchTerm}`
    );
    setState(response.data);
  } catch (error) {
    console.log(error);
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

