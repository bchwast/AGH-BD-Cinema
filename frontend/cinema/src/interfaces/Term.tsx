import {Reservation} from "./Reservation";

export interface Term {
    _id: string;
    date: string;
    totalPlaces: number;
    freePlaces: number;
    movie: string;
}
