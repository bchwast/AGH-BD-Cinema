import {useState} from "react";
import {useGetMovies} from "../../hooks/useGetMovies";
import MovieTile from "../movie-tile/MovieTile";
import './MoviesContainer.scss'
import {movies} from "../../mock-data/mocks";
import {Movie} from "../../interfaces/Movie";

export const MoviesContainer = () => {
    const range = 10;
    const [limit, setLimit] = useState(range);
    const service = useGetMovies();

    const expand = () => {
        setLimit(limit + range);
    }

    return (
        <div className='movies-container container'>
            <div className='row'>
                {!service.loading && service.data.map((movie: Movie, i: number) => (
                    <MovieTile key={i} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MoviesContainer;
