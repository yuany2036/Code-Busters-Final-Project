const axios = require('axios');
const movieModel = require('../models/movieModel');
const User = require('../models/userModel');

// Helper function to get user's movie collection
async function getMovieCollectionForUser(_id) {
  const movieCol = await movieModel.findOne({ user: _id }).populate('movies');
  if (!movieCol) {
    throw new Error('Movie collection not found');
  }
  return movieCol;
}

// External API call to search for movies by title
exports.searchMovie = async (req, res, next) => {
  const title = req.query.title;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results;
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// External API call to search for movies by ID
exports.searchMovieById = async (req, res, next) => {
  const id = req.query.id;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await axios.get(url);
    const movie = response.data;
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// Get reviews of a movie by ID
exports.movieReviewById = async (req, res, next) => {
  console.log('hey');
  const id = req.query.id;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US`;

  try {
    const response = await axios(url);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

// Get user's movie collection
exports.getMovieCollection = async (req, res, next) => {
  const { _id } = req.user;
  try {
    // Find user's movie collection and populate movie details
    const movieCol = await getMovieCollectionForUser(_id);
    return res.json({ success: true, movies: movieCol.movies });
  } catch (error) {
    next(error);
  }
};

// Add movie to user's collection
exports.addToMovieCollection = async (req, res, next) => {
  const { id, posterPath, title, genres } = req.body;
  const { _id } = req.user;

  try {
    // Find or create a collection for the user
    let movieCol = await movieModel.findOne({ user: _id });
    if (!movieCol) {
      movieCol = new movieModel({ user: _id, movies: [] });
    }
    // Check if movie already exists in user's collection
    const alreadySaved = movieCol.movies.find((movie) => movie.title === title);
    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: 'Movie already exists in collection',
      });
    }
    // Save movie to user's collection
    movieCol.movies.push({ id, poster_path: posterPath, title, genres });
    await movieCol.save();
    return res.json({ success: true, message: 'Movie added to collection' });
  } catch (error) {
    next(error);
  }
};

// Update movie status
exports.updateMovieStatus = async (req, res, next) => {
  const { movieId, status } = req.body;
  const { _id } = req.user;

  try {
    // Find user's movie collection and populate movie details
    const movieCol = await getMovieCollectionForUser(_id);
    // Find movie in user's collection
    const movie = movieCol.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in user's collection",
      });
    }
    // Update movie status
    movie.status = status;
    await movieCol.save();
    return res.json({ success: true, message: 'Movie status updated' });
  } catch (error) {
    next(error);
  }
};

// Delete movie from user's collection
exports.deleteMovieFromCollection = async (req, res, next) => {
  const { movieId } = req.body;
  const { _id } = req.user;
  try {
    // Find user's movie collection and populate movie details
    const movieCol = await getMovieCollectionForUser(_id);
    // Find movie in user's collection
    const movieIndex = movieCol.movies.findIndex((movie) => movie.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in user's collection",
      });
    }
    // Remove movie from user's list
    movieCol.movies.splice(movieIndex, 1);
    await movieCol.save();
    return res.json({
      success: true,
      message: 'Movie removed from collection',
    });
  } catch (error) {
    next(error);
  }
};

exports.getPopularMovies = async (req, res, next) => {
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

  try {
    const response = await axios.get(url);
    console.log(response);
    const movies = response.data.results;
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.recommendMoviesByGenre = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const apiKey = process.env.MOVIEDB_API_KEY;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const { preferences, genres } = user;
    if (preferences === 'none') {
      return res
        .status(400)
        .json({ success: false, message: 'User does not have any preference' });
    }

    let recommendedMovies = [];
    let maxMovies = 20;
    let moviesPerGenre = 5;

    while (recommendedMovies.length < maxMovies && genres.length < 20) {
      const genreIds = [
        ...new Set(
          genres.filter((genre) => genre).map((genre) => JSON.parse(genre).id)
        ),
      ];

      const urls = genreIds.map(
        (genreId) =>
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&vote_average.gte=6`
      );

      console.log(
        `Fetching movies from API for genres: ${genreIds.join(',')}...`
      );
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      let movies = responses.flatMap((response) =>
        response.data.results.slice(0, moviesPerGenre)
      );
      console.log(`Fetched ${movies.length} movies from API`);

      const userMovies = await movieModel.findOne({ user: _id });
      const userMovieIds = userMovies
        ? userMovies.movies.map((movie) => movie.id)
        : [];
      console.log(`User has ${userMovieIds.length} movies in collection`);

      const filteredMovies = userMovies
        ? movies.filter(
            (movie) =>
              !userMovieIds.includes(movie.id) &&
              !recommendedMovies.find((recMovie) => recMovie.id === movie.id)
          )
        : movies;
      console.log(`Filtered down to ${filteredMovies.length} movies`);

      recommendedMovies = [...recommendedMovies, ...filteredMovies];
      recommendedMovies = [...new Set(recommendedMovies)];
      console.log(`Recommended movies so far: ${recommendedMovies.length}`);

      if (filteredMovies.length === 0) {
        console.log('No more movies left to recommend for these genres');
        genres.push(null);
        moviesPerGenre = 5;
      } else {
        moviesPerGenre = 10;
      }
    }

    if (recommendedMovies.length === 0) {
      console.log('No recommended movies found');
      return res
        .status(400)
        .json({ success: false, message: 'No recommended movies found' });
    }

    console.log(`Returning ${recommendedMovies.length} recommended movies`);
    res.json(recommendedMovies.slice(0, maxMovies));
  } catch (error) {
    next(error);
  }
};
