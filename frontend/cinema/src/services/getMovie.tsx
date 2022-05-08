import {useEffect, useState } from "react";
import axios from "axios";
import {Movie} from "../interfaces/Movie";

export const useGetMovieService = (id?: string) => {
    const [data, setData] = useState<Movie>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const {data: response} = await axios.get(`http://localhost:8000/api/movies/${id}`);
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
