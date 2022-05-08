import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import MoviesContainer from "./components/movies-container/MoviesContainer";
import Home from "./components/home/Home";
import {MoviePage} from "./components/movie-page/MoviePage";

function App() {
  return (
    <div>
        <NavBar />
        <Router>
            <Routes>
                <Route path="/movies" element={<MoviesContainer />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
