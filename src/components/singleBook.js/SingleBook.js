// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { changeBookId, fetchBookById  } from "../booksList/booksListSlice";
// import Spinner from '../spinner/Spinner'

// import './singleBook.css'

// const SingleBook = () => {
//   const dispatch = useDispatch();
//   const { books, bookId } = useSelector((state) => state.books);

//   useEffect(() => {
//     const persistedBookId = localStorage.getItem("bookId");
//     if (persistedBookId && bookId !== persistedBookId) {
//       dispatch(changeBookId(persistedBookId));
//     }
//   }, [bookId, dispatch]);

//   const data = books.filter((item) => {
//     return item.id === bookId;
//   });

//   useEffect(() => {
//     if (!data.length && bookId) {
//       dispatch(fetchBookById(bookId));
//     }
//   }, [data.length, bookId, dispatch]);

//   if (!data.length) {
//     return <Spinner/>;
//   }

//   const { title, description, thumbnail, categories, authors } = data[0];


//     return (
//         <div className="single-book">
//         <header className="single-book__header">
//           <h1 className="single-book__title">{title}</h1>
//         </header>
//         <div className="single-book__content">
//           <img src={thumbnail} alt={title} className="single-book__img" />
//           <div className="single-book__info">
//             <section className="single-book__section">
//               <h2>Description</h2>
//               <p className="single-book__descr">{description}</p>
//             </section>
//             <section className="single-book__section">
//               <h2>Categories</h2>
//               <p className="single-book__descr">{categories}</p>
//             </section>
//             <section className="single-book__section">
//               <h2>Authors</h2>
//               <p className="single-book__descr">{authors}</p>
//             </section>
//           </div>
//         </div>
//         <footer className="single-book__footer">
//           <Link to="/" className="single-book__back">Back to all</Link>
//         </footer>
//       </div>
      
//     )
      
// }

// export default SingleBook;




import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeBookId, fetchBookById } from "../booksList/booksListSlice";
import Spinner from "../spinner/Spinner";
import BookInfoSection from "../bookInfoSection/BookInfoSection";

import "./singleBook.css";

const SingleBook = () => {
  const dispatch = useDispatch();
  const { books, bookId } = useSelector((state) => state.books);

  useEffect(() => {
    const persistedBookId = localStorage.getItem("bookId");
    if (persistedBookId && bookId !== persistedBookId) {
      dispatch(changeBookId(persistedBookId));
    }
  }, [bookId, dispatch]);

  const data = books.filter((item) => {
    return item.id === bookId;
  });

  useEffect(() => {
    if (!data.length && bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [data.length, bookId, dispatch]);

  if (!data.length) {
    return <Spinner />;
  }

  const { title, description, thumbnail, categories, authors } = data[0];

  return (
    <div className="single-book">
      <header className="single-book__header">
        <h1 className="single-book__title">{title}</h1>
      </header>
      <div className="single-book__content">
        <img src={thumbnail} alt={title} className="single-book__img" />
        <div className="single-book__info">
          <BookInfoSection title="Description" content={description} />
          <BookInfoSection title="Categories" content={categories} />
          <BookInfoSection title="Authors" content={authors} />
        </div>
      </div>
      <footer className="single-book__footer">
        <Link to="/" className="single-book__back">
          Back to all
        </Link>
      </footer>
    </div>
  );
};

export default SingleBook;
