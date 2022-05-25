import {Reservation} from "../interfaces/Reservation";
import {useState, useEffect} from "react";
import axios from "axios";

export const useGetReservations = (id?: string) => {
    const [data, setData] = useState<Reservation[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get(`http://localhost:8080/users/${id}/reservations`);
                setData(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchReservations();
    })

    return {
        data,
        loading
    };
}
