export interface Reservation {
    _id: string;
    customer: string;
    movie: {
        title: string;
        movieRef: string
    };
    term: string;
    numberOfPlaces: number
}
