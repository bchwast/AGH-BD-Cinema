import {Term} from "../../../interfaces/Term";
import {Reservation} from "../../../interfaces/Reservation";
import {Link} from "react-router-dom";

type Props = {
    reservation: Reservation;
}

export const ReservationTile = ({reservation}: Props) => {
    return (
        <div>
            <h4>{reservation.movie.title}</h4>
            <Link to={`/movie/${reservation.movie.movieRef}`}><button>Go to movie</button></Link>
            <p>Places: {reservation.numberOfPlaces}</p>
        </div>
    )
}
