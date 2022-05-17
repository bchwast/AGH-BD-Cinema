import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import MoviesContainer from "./components/movies-container/MoviesContainer";
import Home from "./components/home/Home";
import {MoviePage} from "./components/movie-page/MoviePage";
import LoginPage from "./components/login-page/LoginPage";
import SignupPage from "./components/signup-page/SignupPage";
import AdminPage from "./components/admin-page/AdminPage";
import RequireAuth, {RequireLogin} from "./components/require-auth/RequireLogin";
import RequireAdmin from "./components/require-auth/RequireAdmin";
import ErrorPage from "./components/error-page/ErrorPage";
import RequireLogout from "./components/require-auth/RequireLogout";

function App() {
  return (
    <div>
        <Router>
            <NavBar />
            <Routes>
                <Route element={<RequireAdmin />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>

                <Route element={<RequireLogout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>

                <Route path="/movies" element={<MoviesContainer />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/" element={<Home />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
