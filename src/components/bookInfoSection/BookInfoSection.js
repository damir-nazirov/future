// bookInfoSection/BookInfoSection.js
import React from "react";
import "./bookInfoSection.css";

const BookInfoSection = ({ title, content }) => {
  return (
    <section className="single-book__section">
      <h2>{title}</h2>
      <p className="single-book__descr">{content}</p>
    </section>
  );
};

export default BookInfoSection;
