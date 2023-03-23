import React from "react";
import { Link } from "react-router-dom";

import "./bookItem.css";

const BookItem = ({ item, onClick }) => {
  const { id, title, authors, category, thumbnail, error } = item;

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <li className="books__item">
      <Link to={`/${title}`} onClick={handleClick}>
        <img src={thumbnail} alt={title} className="books__item-img" />
        <div className="books__item-name">{title}</div>
        {error ? (
          <div className="books__item-price">{error}</div>
        ) : (
          <>
            <div className="books__item-price">{authors}</div>
            <div className="books__item-price">{category}</div>
          </>
        )}
      </Link>
    </li>
  );
};

export default BookItem;
