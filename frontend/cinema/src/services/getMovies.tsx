import {useEffect, useState } from "react";
import axios from "axios";
import {Movie} from "../interfaces/Movie";

export const useGetMoviesService = () => {
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
    }, [])

    return {
        data,
        loading,
    };
};
