import {useEffect, useState} from "react";
import {Term} from "../interfaces/Term";
import axios from "axios";

export const useGetTerms = (movieId?: string) => {
    const [data, setData] = useState<Term[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const {data: response} = await axios.get(`http://localhost:8080/movies/${movieId}/terms`);
                setData(response);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        }

        fetchTerms();
    })

    return {
        data,
        loading
    };
};


export const useGetTerm = (id?: string) => {
    const [data, setData] = useState<Term>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTerm = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get(`http://localhost:8080/terms/${id}`);
                setData(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchTerm();
    })

    return {
        data,
        loading
    };
};
