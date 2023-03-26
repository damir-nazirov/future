import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { API_BASE, API_KEY, API_BASE_ById } from "../../api/apiConfig";
import { BOOKS_PER_PAGE } from "../../constants";

const persistedBookId = sessionStorage.getItem("bookId");
const persistedTitle = sessionStorage.getItem("title");
const persistedBooks = sessionStorage.getItem("books");

const initialState = {
  books: persistedBooks ? JSON.parse(persistedBooks) : [],
  booksFound: null,
  title: persistedTitle || "",
  booksLoadingStatus: "start",
  sorting: "relevance",
  offset: 0,
  category: "all",
  bookId: persistedBookId || "",
  newBooks: 0,
  error: null,
  singleBook: [],
};

const _transformbooks = ({ id, volumeInfo }) => {
  const { title, categories, authors, imageLinks, description } = volumeInfo;

  return {
    id,
    title,
    category: categories ? categories[0] : null,
    authors: authors ? authors.toString() : null,
    thumbnail: imageLinks
      ? imageLinks.thumbnail
      : "https://books.google.ru/googlebooks/images/no_cover_thumb.gif",
    description,
    categories,
  };
};

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(changeBookId(bookId));

      const { request } = useHttp();
      const response = await request(
        `${API_BASE_ById}${bookId}?key=${API_KEY}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ([title, offset, sorting, category], { rejectWithValue }) => {
    try {
      const { request } = useHttp();
      const categoryFilter = category !== "all" ? `+subject:${category}` : "";
      const response = await request(
        `${API_BASE}${title}+intitle:${title}${categoryFilter}&startIndex=${offset}&maxResults=${BOOKS_PER_PAGE}&printType=books&projection=full&orderBy=${sorting}&key=${API_KEY}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const removeDuplicateBooks = (books) => {
  const uniqueBookIds = new Set();
  const uniqueBooks = [];

  books.forEach((book) => {
    if (!uniqueBookIds.has(book.id)) {
      uniqueBookIds.add(book.id);
      uniqueBooks.push(book);
    }
  });

  return uniqueBooks;
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeOffset: (state, action) => {
      state.offset = state.offset + action.payload;
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
      sessionStorage.setItem("title", action.payload);
    },
    clearBooks: (state) => {
      state.books = [];
    },
    clearOffset: (state) => {
      state.offset = 0;
    },
    changeSorting: (state, action) => {
      state.books = [];
      state.sorting = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeBookId: (state, action) => {
      state.bookId = action.payload;
      sessionStorage.setItem("bookId", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.booksLoadingStatus = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.booksLoadingStatus = "idle";
        if (action.payload.items) {
          const transformBooks = action.payload.items.map(_transformbooks);
          const uniqueBooks = removeDuplicateBooks([
            ...state.books,
            ...transformBooks,
          ]);
          state.books = uniqueBooks;
          state.newBooks = transformBooks.length;
          state.booksFound = transformBooks.length > 0;
          sessionStorage.setItem("books", JSON.stringify(uniqueBooks));
        } else {
          state.booksFound = false;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.booksLoadingStatus = "idle";
        state.error = action.payload;
      })

      .addCase(fetchBookById.pending, (state, action) => {
        state.bookId = action.meta.arg;
        sessionStorage.setItem("bookId", action.meta.arg);
        state.booksLoadingStatus = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        const book = _transformbooks(action.payload);
        state.singleBook = [book];
        state.booksLoadingStatus = "idle";
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.booksLoadingStatus = "idle";
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = booksSlice;

export default reducer;
export const {
  changeOffset,
  changeTitle,
  clearBooks,
  clearOffset,
  changeSorting,
  changeCategory,
  changeBookId,
} = actions;
