import {Term} from "./Term";

export interface Movie {
    id: string;
    title: string;
    description: string;
    terms: Term[] | null;
    pictures: string[];
}
