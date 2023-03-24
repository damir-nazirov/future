import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  changeTitle,
  clearOffset,
  changeSorting,
  changeCategory,
} from "../booksList/booksListSlice";
import "./searchForm.css";

const SearchForm = () => {
  const [bookName, setBookName] = useState("");
  const dispatch = useDispatch();
  

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const onChangeTitle = () => {
    dispatch(clearOffset());
    dispatch(changeTitle(bookName));
    setBookName("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!isHomePage) {
        navigate("/");
      }
      onChangeTitle();
    }
  };

  const [selectedSorting, setSelectedSorting] = useState("relevance");

  const button = (
    <button
      onClick={() => onChangeTitle()}
      type="button"
      id="button-addon2"
      className="search-form__button"
    >
      <AiOutlineSearch />
    </button>
  );

  useEffect(() => {
    dispatch(clearOffset());
    dispatch(changeSorting(selectedSorting));
  }, [selectedSorting, dispatch]);

  return (
    <div className="search-form">
      <div className="search-form__header">
        <h1>Search for book</h1>
      </div>
      <div className="search-form__input-group">
        <input
          autoFocus
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="search book"
          aria-label="Recipient's username"
          className="search-form__input"
        />

        {isHomePage ? (
          button
        ) : (
          <Link to="/" onClick={() => onChangeTitle()}>
            {button}
          </Link>
        )}
      </div>

      <div className="search-form__filters">
        <div className="search-form__categories">
          <div>Categories</div>
          <select
            disabled={!isHomePage}
            className="search-form__select"
            onChange={(e) => {
              dispatch(changeCategory(e.target.value));
            }}
          >
            <option value="all">all</option>
            <option value="Art">art</option>
            <option value="Biography">biography</option>
            <option value="Computers">computers</option>
            <option value="History">history</option>
            <option value="Medical">medical</option>
            <option value="Poetry">poetry</option>
          </select>
        </div>

        <div className="search-form__sorting">
          <div>Sorting by</div>
          <select
            disabled={!isHomePage}
            className="search-form__select"
            onChange={(e) => {
              setSelectedSorting(e.target.value);
            }}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
