import {useEffect, useState } from "react";
import axios from "axios";
import {Movie} from "../interfaces/Movie";
import useAuth from "./useAuth";

export const useGetMovie = (id?: string) => {
    const [data, setData] = useState<Movie>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const {data: response} = await axios.get(`http://localhost:8080/movies/${id}`);
                setData(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchMovie();
    })

    return {
        data,
        loading,
    };
};


export const useGetMovies = () => {
    const [data, setData] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const {data: response} = await axios.get('http://localhost:8080/movies');
                setData(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchMovies();
    })

    return {
        data,
        loading,
    };
};


export const usePostMovie = async (movie: Movie) => {
    // @ts-ignore
    const {auth} = useAuth();

    try {
        const response = await axios.post('http://localhost:8080/movies',
            JSON.stringify({
                title: movie.title,
                description: movie.description,
                terms: movie.terms,
                pictures: movie.pictures
            }),
            {
                headers: { 'Content-Type': 'application/json'},
                // @ts-ignore
                user: {_id: auth.user._id }
            })
    } catch (err) {
        console.log(err);
    }
}
