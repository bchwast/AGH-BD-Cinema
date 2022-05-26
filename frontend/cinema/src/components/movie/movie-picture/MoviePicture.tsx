import {Movie} from "../../../interfaces/Movie";
import {useState} from "react";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    movie: Movie;
}

export const MoviePicture = ({movie}: Props) => {
    const [shown, setShown] = useState(0);

    const nextPicture = () => {
        let newShown = shown + 1;
        if (newShown >= movie.pictures.length) {
            newShown %= movie.pictures.length;
        }
        setShown(newShown);
    }

    const prevPicture = () => {
        let newShown = shown - 1;
        if (newShown < 0) {
            newShown += movie.pictures.length;
        }
        setShown(newShown);
    }

    return (
        <>
            <button onClick={prevPicture}><FontAwesomeIcon icon={faChevronLeft}/></button>
            <div>
                <img src={movie.pictures[shown]} alt='pic'/>
            </div>
            <button onClick={nextPicture}><FontAwesomeIcon icon={faChevronRight}/></button>
        </>
    )
}
