import {Term} from "./Term";

export interface Movie {
    key: string;
    name: string;
    description: string;
    terms: Term[] | null;
    pictures: string[];
}
