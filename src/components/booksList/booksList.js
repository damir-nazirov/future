// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchBooks,
// //   changeOffset,
// //   clearBooks,
// //   clearOffset,
// // } from "./booksListSlice";
// // import "./booksList.css";

// // import Spinner from "../spinner/Spinner";
// // import BookItem from "../bookItem/BookItem";

// // const BooksList = () => {
// //   const dispatch = useDispatch();

// //   const {
// //     booksLoadingStatus,
// //     books,
// //     title,
// //     sorting,
// //     offset,
// //     category,
// //     newBooks,
// //   } = useSelector((state) => state.books);

// //   const filteredCategoryBooks = (arr) => {
// //     if (books.length > 0 && category !== "all") {
// //       return arr.filter((item) => {
// //         return item.category === category;
// //       });
// //     } else {
// //       return arr;
// //     }
// //   };

// //   const filteredBooks = filteredCategoryBooks(books);
// //   const onFetchClicked = () => {
// //     dispatch(fetchBooks([title, offset, sorting]));
// //     dispatch(changeOffset(15));
// //   };

// //   const setContent = (process, Component) => {
// //     switch (process) {
// //       case "start":
// //         return null;
// //       case "loading":
// //         return <Component />;
// //       case "idle":
// //         return <Component />;
// //       case "error":
// //         return <h1>Error. Something went wrong. Please try later.</h1>;
// //       default:
// //         throw new Error("Unexpected process state");
// //     }
// //   };

// //   useEffect(() => {
// //     if (title !== "") {
// //       dispatch(clearOffset());
// //       dispatch(clearBooks());
// //       dispatch(fetchBooks([title, offset, sorting]));
// //       dispatch(changeOffset(15));
// //     }
// //     // eslint-disable-next-line
// //   }, [title, sorting]);

// //   const renderItems = (arr) => {
// //     const items = arr.map((item, i) => <BookItem key={i} item={item} />);

// //     return (
// //       <>
// //         <div className="books-list__counter">{`Number of books found: ${
// //           filteredBooks.length > 0 && filteredBooks[0].category
// //             ? filteredBooks.length
// //             : 0
// //         }`}</div>
// //         <ul className="books-list__items">
// //           {items}
// //           {booksLoadingStatus === "loading" ? <Spinner /> : null}
// //         </ul>
// //       </>
// //     );
// //   };

// //   return (
// //     <div className="books-list">
// //       {setContent(booksLoadingStatus, () => renderItems(filteredBooks))}
// //       <button
// //         disabled={newBooks < 15}
// //         style={{ display: booksLoadingStatus === "start" ? "none" : "block" }}
// //         onClick={() => onFetchClicked()}
// //         className="books-list__load-more"
// //       >
// //         <div>
// //           {booksLoadingStatus === "loading" ? "loading..." : "load more"}
// //         </div>
// //       </button>
// //     </div>
// //   );
// // };

// // export default BooksList;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBooks,
//   changeOffset,
//   clearBooks,
//   clearOffset,
// } from "./booksListSlice";
// import "./booksList.css";

// import Spinner from "../spinner/Spinner";
// import BookItem from "../bookItem/BookItem";

// const BooksList = ({ items }) => {
//   const dispatch = useDispatch();

//   const {
//     booksLoadingStatus,
//     title,
//     sorting,
//     offset,
//   } = useSelector((state) => state.books);

//   const onFetchClicked = () => {
//     dispatch(fetchBooks([title, offset, sorting]));
//     dispatch(changeOffset(15));
//   };

//   useEffect(() => {
//     if (title !== "") {
//       dispatch(clearOffset());
//       dispatch(clearBooks());
//       dispatch(fetchBooks([title, offset, sorting]));
//       dispatch(changeOffset(15));
//     }
//     // eslint-disable-next-line
//   }, [title, sorting]);

//   return (
//     <div className="books-list">
//       <div className="books-list__counter">{`Number of books found: ${items.length}`}</div>
//       <ul className="books-list__items">
//         {items.map((item, i) => (
//           <BookItem key={i} item={item} />
//         ))}
//         {booksLoadingStatus === "loading" ? <Spinner /> : null}
//       </ul>
//       <button
//         onClick={() => onFetchClicked()}
//         className="books-list__load-more"
//       >
//         <div>
//           {booksLoadingStatus === "loading" ? "loading..." : "load more"}
//         </div>
//       </button>
//     </div>
//   );
// };

// export default BooksList;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBooks,
//   changeOffset,
//   clearBooks,
//   clearOffset,
// } from "./booksListSlice";
// import "./booksList.css";

// import Spinner from "../spinner/Spinner";
// import BookItem from "../bookItem/BookItem";

// const BooksList = ({ items, onBookItemClick }) => {
//   const dispatch = useDispatch();

//   const {
//     booksLoadingStatus,
//     title,
//     sorting,
//     offset,
//   } = useSelector((state) => state.books);

//   const onFetchClicked = () => {
//     dispatch(fetchBooks([title, offset, sorting]));
//     dispatch(changeOffset(15));
//   };

//   useEffect(() => {
//     if (title !== "") {
//       dispatch(clearOffset());
//       dispatch(clearBooks());
//       dispatch(fetchBooks([title, offset, sorting]));
//       dispatch(changeOffset(15));
//     }
//     // eslint-disable-next-line
//   }, [title, sorting]);

//   return (
//     <div className="books-list">
//       <div className="books-list__counter">{`Number of books found: ${items.length}`}</div>
//       <ul className="books-list__items">
//         {items.map((item, i) => (
//           <BookItem key={i} item={item} onClick={onBookItemClick} />
//         ))}
//         {booksLoadingStatus === "loading" ? <Spinner /> : null}
//       </ul>
//       <button
//         onClick={() => onFetchClicked()}
//         className="books-list__load-more"
//       >
//         <div>
//           {booksLoadingStatus === "loading" ? "loading..." : "load more"}
//         </div>
//       </button>
//     </div>
//   );
// };

// export default BooksList;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  changeOffset,
  clearBooks,
  clearOffset,
} from "./booksListSlice";
import "./booksList.css";

import Spinner from "../spinner/Spinner";
import BookItem from "../bookItem/BookItem";

const BooksList = ({ items, onBookItemClick }) => {
  const dispatch = useDispatch();

  const {
    booksLoadingStatus,
    title,
    sorting,
    offset,
    newBooks,
    category,
    booksFound 
  } = useSelector((state) => state.books);

  const onFetchClicked = () => {
    dispatch(fetchBooks([title, offset, sorting, category]));
    dispatch(changeOffset(15));
  };

  useEffect(() => {
    if (title !== "") {
      dispatch(clearOffset());
      dispatch(clearBooks());
      dispatch(fetchBooks([title, offset, sorting, category]));
      dispatch(changeOffset(15));
    }
    // eslint-disable-next-line
  }, [title, sorting]);

  const hasMoreBooks = newBooks >= 15;

  return (
    <div className="books-list">
      {items.length > 0 && (
        <div className="books-list__counter">{`Number of books found: ${items.length}`}</div>
      )}
      <ul className="books-list__items">
      {items.map((item) => (
  <BookItem key={item.id} item={item} onClick={onBookItemClick} />
))}

        {booksLoadingStatus === "loading" ? <Spinner /> : null}
      </ul>
      {booksFound === false && (
        <div className="books-list__no-books">
          No books available for this search.
        </div>
      )}
      {items.length > 0 && (
        <>
          {hasMoreBooks ? (
            <button
              onClick={() => onFetchClicked()}
              className="books-list__load-more"
            >
              <div>
                {booksLoadingStatus === "loading" ? "loading..." : "load more"}
              </div>
            </button>
          ) : (
            <div className="books-list__no-more-books">No more books available for this search.</div>
          )}
        </>
      )}
    </div>
  );
  
};

export default BooksList;
