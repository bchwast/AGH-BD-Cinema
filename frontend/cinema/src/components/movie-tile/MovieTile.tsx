import {Movie} from "../../interfaces/Movie";
import './MovieTIle.scss'
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";


type Props = {
    movie: Movie;
}

export const MovieTile = ({ movie } : Props) => {
    return (
        <Link to={`/movie/${movie._id}`} className="col-md-3">
            <Card>
                <Card.Img variant="top" src={movie.pictures[0]} />
                <Card.Body>
                    <Card.Text>
                        {movie.title}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default MovieTile;
