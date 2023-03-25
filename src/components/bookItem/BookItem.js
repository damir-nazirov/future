import React from "react";
import { Link } from "react-router-dom";

import "./bookItem.css";

const BookItem = ({ item, onClick, searchQuery }) => {
  const { id, title, authors, category, thumbnail } = item;

  const handleClick = () => {
    if (onClick) {
      sessionStorage.setItem("searchQuery", searchQuery);
      onClick(id);
    }
  };

  return (
    <li className="books__item">
      <Link to={`/${title}`} onClick={handleClick}>
        <img src={thumbnail} alt={title} className="books__item-img" />
        <div className="books__item-name">{title}</div>
        <div className="books__item-authors">{authors}</div>
        <div className="books__item-category">{category}</div>
      </Link>
    </li>
  );
};

export default BookItem;
