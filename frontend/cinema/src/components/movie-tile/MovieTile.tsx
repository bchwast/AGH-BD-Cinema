import {Movie} from "../../interfaces/Movie";
import './MovieTIle.scss'

type Props = {
    movie: Movie;
}

export const MovieTile = ({ movie } : Props) => {

    return (
        <div className='container'>
            <img src={movie.pictures[0]} alt='movie picture'/>
            <p>{movie.name}</p>
        </div>
    )
}

export default MovieTile;
