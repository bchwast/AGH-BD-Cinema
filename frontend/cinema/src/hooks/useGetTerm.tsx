import {Term} from "../interfaces/Term";
import {useEffect, useState} from "react";
import axios from "axios";

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
