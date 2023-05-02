import React, { useState, useEffect } from 'react';
import styles from '../card/Card.module.scss';
import axios from 'axios';
import BookCard from '../card/BookCard';

const BestSellersList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/books/popular');
        setBooks(res.data.slice(0, 20));
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className={styles.top_h1}>Top Bestsellers Books</h1>
      <div className={styles.explore}>
        {books.map(
          ({
            data: {
              authors,
              title,
              infoLink,
              imageLinks: { thumbnail },
            },
            id,
          }) => (
            <BookCard
              key={infoLink}
              authors={authors}
              title={title}
              thumbnail={thumbnail}
              id={id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BestSellersList;
