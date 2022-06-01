import useAuth from "../../hooks/useAuth";
import {ReservationTile} from "../reservation/reservation-tile/ReservationTile";
import {Reservation} from "../../interfaces/Reservation";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {ReservationDelete} from "../reservation/reservation-delete/ReservationDelete";
import {ReservationEdit} from "../reservation/reservation-edit/ReservationEdit";

export const UserPage = () => {
    // @ts-ignore
    const {auth, setAuth} = useAuth();
    const [reservations, setReseravtions] = useState<Reservation[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            getReservations();
        }
    }, [loaded]);

    const getReservations = async () => {
        try {
            const {data: response} = await axios.get(`http://localhost:8080/users/${auth?.id}/reservations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': auth.token
                },
                // @ts-ignore
                user: {_id: auth.id }
            });
            setReseravtions(response);
            console.log(response);
            setLoaded(true);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (err.response?.status === 418) {
                    console.log('Token has expired');
                    setAuth({});
                }
            }
        }
    }

    return (
        <>
            <h1>
                You're an user
            </h1>
            <h2>
                Your name: {auth?.firstname + ' ' + auth?.lastname}
            </h2>
            {loaded && reservations.map((res: Reservation, i: number) => (
                <>
                    <ReservationTile reservation={res} key={i*3} />
                    <ReservationDelete reservation={res} update={setLoaded} key={i*3 + 1} />
                    <ReservationEdit reservation={res} update={setLoaded} key={i*3 + 2} />
                </>
                ))}
        </>
    )
}

export default UserPage;