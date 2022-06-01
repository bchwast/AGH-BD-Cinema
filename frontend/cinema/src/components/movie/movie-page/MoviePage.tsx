import {Movie} from "../../../interfaces/Movie";
import {Link, useParams} from "react-router-dom";
import {Term} from "../../../interfaces/Term";
import useAuth from "../../../hooks/useAuth";
import {useEffect, useState} from "react";
import axios from "axios";
import {TermDelete} from "../../term/term-delete/TermDelete";
import {ReservationAdd} from "../../reservation/reservation-add/ReservationAdd";
import MovieDelete from "../movie-delete/MovieDelete";
import {MoviePicture} from "../movie-picture/MoviePicture";
import './MoviePage.scss';

export const MoviePage = () => {
    // @ts-ignore
    const {auth} = useAuth();

    const {id} = useParams();
    const [loadedMovie, setLoadedMovie] = useState(false);
    const [loadedTerms, setLoadedTerms] = useState(false);
    const [movie, setMovie] = useState<Movie>();
    const [terms, setTerms] = useState<Term[]>([]);

    useEffect(() => {
        if (!loadedMovie) {
            getMovie();
        }
    }, [loadedMovie]);

    useEffect(() => {
        if (!loadedTerms) {
            getTerms();
        }
    }, [loadedTerms]);

    const getMovie = async () => {
        try {
            const {data: response} = await axios.get(`http://localhost:8080/movies/${id}`, {
                headers: {'Content-Type': 'application/json'}});
            setMovie(response);
            setLoadedMovie(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getTerms = async () => {
        try {
            const {data: response} = await axios.get(`http://localhost:8080/movies/${id}/terms`);
            setTerms(response);
            console.log(terms.map(t => t.freePlaces));
            setLoadedTerms(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>
                {loadedMovie && movie!.title}
            </h2>
            <p>
                {loadedMovie && movie!.description}
            </p>
            {loadedMovie ? <MoviePicture movie={movie!} /> : null}
            {loadedMovie && auth?.admin ? <Link to={`/movie/${movie!._id}/edit`}>
                <button>Edit</button>
            </Link> : null}
            {loadedMovie && auth?.admin ? <Link to={`/movie/${movie!._id}/addterm`}>
                <button>Add term</button>
            </Link> : null}
            {loadedMovie && auth?.admin ? <MovieDelete movieID={movie!._id} /> : null}
            <div> {loadedTerms && terms.map((term: Term, i: number) => {
                    return ( <div key={i}>
                        <p>Date: {(new Date(term.date)).toISOString().substring(0, 16).replace('T', ' ')}</p>
                        <p>Free places: {term.freePlaces}</p>
                        <p>Total places: {term.totalPlaces}</p>
                        {auth?.token ? <ReservationAdd term={term} update={setLoadedTerms}/> : null}
                        {auth?.admin ? <Link to={`/term/${term._id}/edit`}><button>Edit term</button></Link> : null}
                        {auth?.admin ? <TermDelete termID={term._id} update={setLoadedTerms}/> : null}
                    </div>)
                })}
            </div>
        </div>
    )
}
