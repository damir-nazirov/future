import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../errorMessage/errorMessage";
import {
  fetchBooks,
  changeOffset,
  clearBooks,
  clearOffset,
} from "./booksListSlice";
import "./booksList.css";

import Spinner from "../spinner/Spinner";
import BookItem from "../bookItem/BookItem";

// Компонент для отображения списка книг
const BooksList = ({ items, onBookItemClick }) => {
  const dispatch = useDispatch();

  // Извлекаем данные из хранилища
  const {
    booksLoadingStatus,
    title,
    sorting,
    offset,
    newBooks,
    category,
    booksFound,
    error,
  } = useSelector((state) => state.books);

  // Функция для обработки клика на кнопку "Загрузить еще"
  const onFetchClicked = useCallback(() => {
    dispatch(fetchBooks([title, offset, sorting, category]));
    dispatch(changeOffset(15));
  }, [dispatch, title, offset, sorting, category]);

  // Обновляем список книг при изменении параметров поиска
  useEffect(() => {
    if (title !== "") {
      dispatch(clearOffset());
      dispatch(clearBooks());
      dispatch(fetchBooks([title, offset, sorting, category]));
      dispatch(changeOffset(15));
    }
    // eslint-disable-next-line
  }, [title, sorting]);

  // Определяем, есть ли еще книги для загрузки
  const hasMoreBooks = newBooks >= 15;

  // Отображение счетчика найденных книг
  const renderBookCounter = () => {
    if (items.length > 0) {
      return (
        <div className="books-list__counter">{`Number of books found: ${items.length}`}</div>
      );
    }
  };

  // Отображение элементов списка книг
  const renderBookItems = () => {
    return items.map((item) => (
      <BookItem key={item.id} item={item} onClick={onBookItemClick} />
    ));
  };

  // Отображение спиннера (индикатора загрузки)
  const renderSpinner = () => {
    if (booksLoadingStatus === "loading") {
      return <Spinner />;
    }
  };

  // Отображение сообщения об отсутствии книг
  const renderNoBooksMessage = () => {
    if (booksFound === false) {
      return (
        <div className="books-list__no-books">
          No books available for this search.
        </div>
      );
    }
  };

  // Отображение кнопки "Загрузить еще"
  const renderLoadMoreButton = () => {
    if (items.length > 0) {
      if (hasMoreBooks) {
        return (
          <button onClick={onFetchClicked} className="books-list__load-more">
            <div>
              {booksLoadingStatus === "loading" ? "loading..." : "load more"}
            </div>
          </button>
        );
      } else {
        return (
          <div className="books-list__no-more-books">
            No more books available for this search.
          </div>
        );
      }
    }
  };

  return (
    <div className="books-list">
      {renderBookCounter()}
      <ul className="books-list__items">
        {renderBookItems()}
        {renderSpinner()}
      </ul>
      {renderNoBooksMessage()}
      {renderLoadMoreButton()}
      <ErrorMessage error={error} />
    </div>
  );
};

export default BooksList;



// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ErrorMessage from "../errorMessage/errorMessage";
// import {
//   fetchBooks,
//   changeOffset,
//   clearBooks,
//   clearOffset,
//   changeTitle
// } from "./booksListSlice";
// import "./booksList.css";

// import Spinner from "../spinner/Spinner";
// import BookItem from "../bookItem/BookItem";

// // Компонент для отображения списка книг
// const BooksList = ({ items, onBookItemClick }) => {
//   const dispatch = useDispatch();

//   // Извлекаем данные из хранилища
//   const {
//     booksLoadingStatus,
//     title,
//     sorting,
//     offset,
//     newBooks,
//     category,
//     booksFound,
//     error,
//   } = useSelector((state) => state.books);

//   // Функция для обработки клика на кнопку "Загрузить еще"
//   const onFetchClicked = useCallback(() => {
//     dispatch(fetchBooks([title, offset, sorting, category]));
//   }, [dispatch, title, offset, sorting, category]);
  


//   useEffect(() => {
//     const storedSearchQuery = sessionStorage.getItem('searchQuery');
//     const storedItems = sessionStorage.getItem('items');
    
//     if (storedSearchQuery && storedItems) {
//       dispatch(changeTitle(storedSearchQuery));
//       dispatch(clearBooks()); // Очистите текущий список книг перед добавлением сохраненных
//       dispatch({ type: "books/addBooks", payload: JSON.parse(storedItems) }); // Добавьте сохраненные книги
//     }
    
//     // Удалите данные из sessionStorage после восстановления состояния, чтобы при перезагрузке главной страницы они не восстанавливались
//     sessionStorage.removeItem('searchQuery');
//     sessionStorage.removeItem('items');
    
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (items.length > 0) {
//       sessionStorage.setItem('items', JSON.stringify(items));
//     }
//   }, [items]);

//   useEffect(() => {
//     if (title !== "") {
//       dispatch(clearOffset());
//       dispatch(clearBooks());
//       dispatch(fetchBooks([title, 0, sorting, category])); // Установите смещение на 0 при новом поиске
//     }
//     // eslint-disable-next-line
//   }, [title, sorting, category]);



//   useEffect(() => {
//     if (title !== "" && offset > 0) {
//       dispatch(fetchBooks([title, offset, sorting, category]));
//     }
//     // Увеличиваем смещение на 15 после успешной загрузки книг
//     if (booksLoadingStatus === "success") {
//       dispatch(changeOffset(15));
//     }
//     // eslint-disable-next-line
//   }, [offset, booksLoadingStatus]);
  
  

  
  

//   // Определяем, есть ли еще книги для загрузки
//   const hasMoreBooks = newBooks >= 15;

//   // Отображение счетчика найденных книг
//   const renderBookCounter = () => {
//     if (items.length > 0) {
//       return (
//         <div className="books-list__counter">{`Number of books found: ${items.length}`}</div>
//       );
//     }
//   };

//   // Отображение элементов списка книг
//   const renderBookItems = () => {
//     return items.map((item) => (
//       <BookItem
//         key={item.id}
//         item={item}
//         onClick={onBookItemClick}
//         searchQuery={title}
//       />
//     ));
//   };
  

//   // Отображение спиннера (индикатора загрузки)
//   const renderSpinner = () => {
//     if (booksLoadingStatus === "loading") {
//       return <Spinner />;
//     }
//   };

//   // Отображение сообщения об отсутствии книг
//   const renderNoBooksMessage = () => {
//     if (booksFound === false) {
//       return (
//         <div className="books-list__no-books">
//           No books available for this search.
//         </div>
//       );
//     }
//   };

//   // Отображение кнопки "Загрузить еще"
//   const renderLoadMoreButton = () => {
//     if (items.length > 0) {
//       if (hasMoreBooks) {
//         return (
//           <button onClick={onFetchClicked} className="books-list__load-more">
//             <div>
//               {booksLoadingStatus === "loading" ? "loading..." : "load more"}
//             </div>
//           </button>
//         );
//       } else {
//         return (
//           <div className="books-list__no-more-books">
//             No more books available for this search.
//           </div>
//         );
//       }
//     }
//   };

//   return (
//     <div className="books-list">
//       {renderBookCounter()}
//       <ul className="books-list__items">
//         {renderBookItems()}
//         {renderSpinner()}
//       </ul>
//       {renderNoBooksMessage()}
//       {renderLoadMoreButton()}
//       <ErrorMessage error={error} />
//     </div>
//   );
// };

// export default BooksList;

