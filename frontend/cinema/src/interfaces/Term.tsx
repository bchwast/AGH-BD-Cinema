import {Reservation} from "./Reservation";

export interface Term {
    date: string;
    totalPlaces: number;
    freePlaces: number;
    reservations: Reservation[];
}
