import {useEffect, useState} from "react";
import MovieTile from "../movie-tile/MovieTile";
import './MoviesContainer.scss'
import {Movie} from "../../../interfaces/Movie";
import useAuth from "../../../hooks/useAuth";
import {Link} from "react-router-dom";
import axios from "axios";

export const MoviesContainer = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const range = 10;
    const [limit, setLimit] = useState(range);
    const [loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (!loaded) {
            getMovies();
        }
    }, [loaded]);

    const getMovies = async () => {
        try {
            const {data: response} = await axios.get('http://localhost:8080/movies', {
                headers: {'Content-Type': 'application/json'}});
            setMovies(response);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    const expand = () => {
        setLimit(limit + range);
    }

    return (
        <>
            {auth?.admin ? <Link to="/movie/add"> Add movie </Link> : null}
            <div className='movies-container container'>
                <div className='row'>
                    {loaded && movies.map((movie: Movie, i: number) => (
                        <>
                            <MovieTile key={i*4} movie={movie} />

                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MoviesContainer;