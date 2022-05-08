import {Movie} from "../../interfaces/Movie";
import './MovieTIle.scss'
import {Link} from "react-router-dom";

type Props = {
    movie: Movie;
}

export const MovieTile = ({ movie } : Props) => {
    const goToMovie = () => {

    }

    return (
        <div className='container'>
            {/*<img src={movie.pictures[0]} alt='movie picture'/>*/}
            <Link to={`/movie/${movie.id}`}> <p>{movie.title}</p> </Link>
        </div>
    )
}

export default MovieTile;
