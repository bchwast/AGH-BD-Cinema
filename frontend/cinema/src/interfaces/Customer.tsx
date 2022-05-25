import {Reservation} from "./Reservation";

export interface Customer {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    admin: boolean;
    reservations: Reservation[] | null;
}
