import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../notFound/NotFound.module.scss';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchTerm);
    // Clear search input field
    setSearchTerm('');
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (searchTerm) => {
    //redirecting to a search results page:
    navigate(`/${searchTerm}`);
  };

    return (
         <div className={styles.search_bar}>
    <form onSubmit={handleSubmit}>
      <input
                    type="text"
                    placeholder='type here..'
        id="search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form></div>
  );
}

export default SearchBar;
