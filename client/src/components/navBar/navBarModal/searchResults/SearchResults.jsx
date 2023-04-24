import { useEffect } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const searchTerm = 'avengers';
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/movies/?title=${searchTerm}`
        );
        console.log(res);
      } catch (err) {
        console.log(err.res);
      }
    })();
  }, []);

  return <div>{searchTerm}</div>;
};

export default SearchResults;
