import React, { useState, useEffect } from 'react';
import styles from '../card/MovieCard.module.scss';
import axios from 'axios';
import BookCard from '../card/BookCard';

const BestSellersList = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books/popular");
        setBooks(res.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBooks()
  }, []);
console.log(books)
  return (
    <div>
      <div className="listContainer">
        {books.map(
          ({
            authors,
            title,
            description,
            infoLink,
            imageLinks: { thumbnail },
          }) => {
            return (
              <div key={infoLink}>
                <img src={thumbnail} />
                <h1>{title}</h1>
                <h2>{authors.join(", ")}</h2>
                <p>{description}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default BestSellersList;
