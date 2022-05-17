import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import MoviesContainer from "./components/movies-container/MoviesContainer";
import Home from "./components/home/Home";
import {MoviePage} from "./components/movie-page/MoviePage";
import LoginPage from "./components/login-page/LoginPage";
import SignupPage from "./components/signup-page/SignupPage";

function App() {
  return (
    <div>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/movies" element={<MoviesContainer />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
