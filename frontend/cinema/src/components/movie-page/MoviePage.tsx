import {Movie} from "../../interfaces/Movie";
import {useParams} from "react-router-dom";
import {useGetMovie} from "../../hooks/useGetMovie";
import {useGetTerm} from "../../hooks/useGetTerm";
import {useGetTerms} from "../../hooks/useGetTerms";
import {Term} from "../../interfaces/Term";

export const MoviePage = () => {
    const {id} = useParams();
    const getMovie = useGetMovie(id);
    const getTerms = useGetTerms(id);

    return (
        <div>
            <h2>
                {!getMovie.loading && getMovie.data?.title}
            </h2>
            <p>
                {!getMovie.loading && getMovie.data?.description}
            </p>
            <div> {!getTerms.loading && getTerms.data.map((term: Term, i: number) => {
                    return ( <div key={i}>
                        <p>Date: {term.date}</p>
                        <p>Free places: {term.freePlaces}</p>
                        <p>Total places: {term.totalPlaces}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}
