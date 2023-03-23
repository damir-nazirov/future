import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import {API_BASE, API_KEY, API_BASE_ById} from "../../api/apiConfig"

const persistedBookId = localStorage.getItem("bookId");


const initialState = {
    books: [],
    booksFound: null,
    title: '',
    booksLoadingStatus: 'start',
    sorting: 'relevance',
    offset: 0,
    category: 'all',
    bookId: persistedBookId || '',
    newBooks: 0
}


// const API_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

// // const API_KEY = 'AIzaSyDHyzZSk0BnLt1YHTaB0z3zYYwIVOBpo-0'; //на случай, если лимит запросов закончится
// const API_KEY = 'AIzaSyAsPmj8VJE8iiwhASmis_D-EEHaotnbiqc';

const _transformbooks = ({ id, volumeInfo }) => {
    const {
      title,
      categories,
      authors,
      imageLinks,
      description
    } = volumeInfo;
  
    return {
      id,
      title,
      category: categories ? categories[0] : null,
      authors: authors ? authors.toString() : null,
      thumbnail: imageLinks ? imageLinks.thumbnail : 'https://books.google.ru/googlebooks/images/no_cover_thumb.gif',
      description,
      categories
    };
  };

  // const API_BASEById = 'https://www.googleapis.com/books/v1/volumes/';

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (bookId) => {
    const { request } = useHttp();
    return await request(`${API_BASE_ById}${bookId}?key=${API_KEY}`);
  }
);

// export const fetchBooks = createAsyncThunk(
//     'books/fetchBooks',
//     async ([title, offset, sorting]) => {
//         const {request} = useHttp();
//         return await request(`${API_BASE}${title}+intitle:${title}&startIndex=${offset}&maxResults=15&printType=books&projection=full&orderBy=${sorting}&key=${API_KEY}`);
//     }
// );

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ([title, offset, sorting, category]) => {
        const {request} = useHttp();
        const categoryFilter = category !== "all" ? `+subject:${category}` : "";
        return await request(`${API_BASE}${title}+intitle:${title}${categoryFilter}&startIndex=${offset}&maxResults=15&printType=books&projection=full&orderBy=${sorting}&key=${API_KEY}`);
    }
);



const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        changeOffset: (state, action) => {
            state.offset = state.offset + action.payload
            
        },
        changeTitle: (state, action) => {
            state.title = action.payload
            
        },
        clearBooks: (state) => {
            state.books = []
            
        },
        clearOffset: (state) => {
            state.offset = 0
            
        },
        changeSorting: (state, action) => {
            state.sorting = action.payload
            
        },
        changeCategory: (state, action) => {
            state.category = action.payload
            
        },
        changeBookId: (state, action) => {
            state.bookId = action.payload;
            localStorage.setItem("bookId", action.payload);
          },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, state => {state.booksLoadingStatus = 'loading'})
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.booksLoadingStatus = 'idle';
                if (action.payload.items) {
                  const transformBooks = action.payload.items.map(_transformbooks);
                  state.books = [...state.books, ...transformBooks];
                  state.newBooks = [transformBooks.length];
                  state.booksFound = transformBooks.length > 0;
                } else {
                  state.booksFound = false;
                }
              })
            .addCase(fetchBooks.rejected, state => {
                state.booksLoadingStatus = 'error';
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                const book = _transformbooks(action.payload);
                state.books = [...state.books, book];
              })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = booksSlice;

export default reducer;
export const {
    changeOffset,
    changeTitle,
    clearBooks,
    clearOffset,
    changeSorting,
    changeCategory,
    changeBookId
} = actions;

