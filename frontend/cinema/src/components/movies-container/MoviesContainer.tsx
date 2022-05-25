import {useState} from "react";
import {useGetMovies} from "../../hooks/useMovies";
import MovieTile from "../movie-tile/MovieTile";
import './MoviesContainer.scss'
import {movies} from "../../mock-data/mocks";
import {Movie} from "../../interfaces/Movie";
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import {MovieDelete} from "../movie-delete/MovieDelete";

export const MoviesContainer = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const range = 10;
    const [limit, setLimit] = useState(range);
    const service = useGetMovies();

    const expand = () => {
        setLimit(limit + range);
    }

    return (
        <>
            {auth?.admin ? <Link to="/movie/add"> Add movie </Link> : null}
            <div className='movies-container container'>
                <div className='row'>
                    {!service.loading && service.data.map((movie: Movie, i: number) => (
                        <>
                            <MovieTile key={i*4} movie={movie} />
                            {auth?.admin ? <Link key={i*4 + 1} to={`/movie/${movie._id}/edit`}>
                                <button>Edit</button>
                            </Link> : null}
                            {auth?.admin ? <Link key={i*4 + 2} to={`/movie/${movie._id}/addterm`}>
                                <button>Add term</button>
                            </Link> : null}
                            {auth?.admin ? <MovieDelete key={i*4 + 3} movieID={movie._id} /> : null}
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MoviesContainer;
