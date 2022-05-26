import useAuth from "../../../hooks/useAuth";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Reservation} from "../../../interfaces/Reservation";

type Props = {
    reservation: Reservation;
    update: any;
}

export const ReservationDelete = ({reservation, update}: Props) => {
    // @ts-ignore
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');

    const deleteReservation = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/users/${reservation.customer}/reservations/${reservation._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': auth.token
                    },
                    // @ts-ignore
                    user: {_id: auth.id }
                })
            update(false);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    // @ts-ignore
                    setErrMsg(err.response.data);
                }
            } else {
                setErrMsg('Reservation delete error');
            }
        }
    }

    return (
        <>
            <button onClick={deleteReservation}>Delete</button>
        </>
    )
}
