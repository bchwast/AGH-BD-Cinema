import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {Customer} from "../../interfaces/Customer";
import axios from "axios";
import {ReservationTile} from "../reservation/reservation-tile/ReservationTile";
import {ReservationDelete} from "../reservation/reservation-delete/ReservationDelete";
import {ReservationEdit} from "../reservation/reservation-edit/ReservationEdit";

export const AdminPage = () => {
    // @ts-ignore
    const {auth} = useAuth();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            getCustomers();
        }
    }, [loaded]);

    const getCustomers = async () => {
        try {
            const {data: response} = await axios.get(`http://localhost:8080/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': auth.token
                },
                // @ts-ignore
                user: {_id: auth.id }
            });
            setCustomers(response);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>
                You're an admin
            </h1>
            <h2>Customers: </h2>
            {loaded && customers.map((customer, i) => (
                <>
                    <h3>{customer.firstname} {customer.lastname}</h3>
                    <div>{customer.reservations?.map((res, ii) => (
                        <>
                            <ReservationTile reservation={res} />
                            <ReservationDelete reservation={res} update={setLoaded} />
                            <ReservationEdit reservation={res} update={setLoaded} />
                        </>
                    ))}
                    </div>
                </>
            ))}
        </>
    )
}

export default AdminPage;
