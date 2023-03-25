import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BooksList from "../booksList/booksList";
import { fetchBookById } from "../booksList/booksListSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { books, category } = useSelector((state) => state.books);

  const filteredCategoryBooks = (arr) => {
    if (books.length > 0 && category !== "all") {
      return arr.filter((item) => {
        return item.category === category;
      });
    } else {
      return arr;
    }
  };

  console.log(books);
  const filteredBooks = filteredCategoryBooks(books);

  const handleBookItemClick = (bookId) => {
    dispatch(fetchBookById(bookId));
  };

  return (
    <BooksList items={filteredBooks} onBookItemClick={handleBookItemClick} />
  );
};

export default MainPage;
