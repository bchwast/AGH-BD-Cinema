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
    const {auth, setAuth} = useAuth();

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
                    console.log('No server response');
                } else if (err.response?.status === 400) {
                    console.log(err.response.data);
                } else if (err.response?.status === 418) {
                    console.log('Token has expired');
                    setAuth({});
                }
            } else {
                console.log('Reservation delete error');
            }
        }
    }

    return (
        <>
            <button onClick={deleteReservation}>Delete</button>
        </>
    )
}
