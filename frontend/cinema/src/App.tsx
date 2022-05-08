import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import MoviesContainer from "./components/movies-container/MoviesContainer";
import Home from "./components/home/Home";

function App() {
  return (
    <div>
        <NavBar />
        <Router>
            <Routes>
                <Route path="/movies" element={<MoviesContainer />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
