import {useEffect, useState } from "react";
import {Service} from "../interfaces/Service";
import {Movie} from "../interfaces/Movie";

export const useGetMoviesService = () => {
    const [result, setResult] = useState<Service<Movie[]>>({
        status: 'loading'
    });

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         try {
    //             setResult();
    //         }
    //     }
    // })
}
