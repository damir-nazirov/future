
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookById } from "../booksList/booksListSlice";
import Spinner from "../spinner/Spinner";
import BookInfoSection from "../bookInfoSection/BookInfoSection";

import "./singleBook.css";

const SingleBook = () => {
  const dispatch = useDispatch();
  const { bookId, booksLoadingStatus, singleBook } = useSelector(
    (state) => state.books
  );

  const bookData = singleBook[0]

  useEffect(() => {
    if (!bookData && bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [bookData, bookId, dispatch]);

  if (booksLoadingStatus === "loading") {
    return <Spinner />;
  }

  if (!bookData) {
    return <div>No book data available.</div>;
  }

  const { title, description, thumbnail, categories, authors } = bookData;

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
    </div>
  );
};

export default SingleBook;
