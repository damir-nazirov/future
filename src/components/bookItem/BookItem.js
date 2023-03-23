// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { changeBookId, clearOffset } from "../booksList/booksListSlice";

// import "./bookItem.css"

// const BookItem = ({ item }) => {
//   const dispatch = useDispatch();

//   return (
//     <li className="books__item">
//       <Link
//         to={`/${item.title}`}
//         onClick={() => {
//           dispatch(changeBookId(item.id));
//           dispatch(clearOffset());
//         }}
//       >
//         <img
//           src={item.thumbnail}
//           alt={item.title}
//           className="books__item-img"
//         />
//         <div className="books__item-name">{item.title}</div>
//         <div className="books__item-price">{item.authors}</div>
//         <div className="books__item-price">{item.category}</div>
//         <div className="books__item-price">{item.error}</div>
//       </Link>
//     </li>
//   );
// };

// export default BookItem;


import React from "react";
import { Link } from "react-router-dom";

import "./bookItem.css";

const BookItem = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item.id);
    }
  };

  return (
    <li className="books__item">
      <Link to={`/${item.title}`} onClick={handleClick}>
        <img src={item.thumbnail} alt={item.title} className="books__item-img" />
        <div className="books__item-name">{item.title}</div>
        <div className="books__item-price">{item.authors}</div>
        <div className="books__item-price">{item.category}</div>
        <div className="books__item-price">{item.error}</div>
      </Link>
    </li>
  );
};

export default BookItem;
