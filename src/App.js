import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SearchForm from './components/searchForm/SearchForm';
import SingleBookPage from './components/pages/SingleBookPage';
import ErrorBoundary from './components/errorBoundery/ErrorBoundery';


import './App.css';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
          <SearchForm/>
          <ErrorBoundary>
          <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/:title" element={<SingleBookPage/>}/>
                </Routes>   
          </ErrorBoundary>
               
      </div>
    </Router>
  );
}

export default App;
