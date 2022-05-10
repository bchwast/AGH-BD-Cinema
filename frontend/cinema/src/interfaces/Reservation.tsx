import {Customer} from "./Customer";
import {Place} from "./Place";

export interface Reservation {
    places: Place[];
    customer: Customer;
}
