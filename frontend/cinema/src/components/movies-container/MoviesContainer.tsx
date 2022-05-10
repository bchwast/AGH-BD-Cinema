import {useState} from "react";
import {useGetMoviesService} from "../../services/getMovies";
import MovieTile from "../movie-tile/MovieTile";
import './MoviesContainer.scss'
import {movies} from "../../mock-data/mocks";
import {Movie} from "../../interfaces/Movie";

export const MoviesContainer = () => {
    const range = 10;
    const [limit, setLimit] = useState(range);
    const service = useGetMoviesService();

    const expand = () => {
        setLimit(limit + range);
    }

    return (
        <div className='movies-container container'>
            <div className='row'>
                {!service.loading && service.data.map((movie: Movie) => (
                    <MovieTile movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MoviesContainer;
