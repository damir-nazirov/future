import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeBookId, fetchBookById } from "../booksList/booksListSlice";
import Spinner from "../spinner/Spinner";
import BookInfoSection from "../bookInfoSection/BookInfoSection";

import "./singleBook.css";

const SingleBook = () => {
  const dispatch = useDispatch();
  const { books, bookId, booksLoadingStatus } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    const persistedBookId = localStorage.getItem("bookId");
    if (persistedBookId && bookId !== persistedBookId) {
      dispatch(changeBookId(persistedBookId));
    }
  }, [bookId, dispatch]);

  const bookData = books.find((item) => item.id === bookId);

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
