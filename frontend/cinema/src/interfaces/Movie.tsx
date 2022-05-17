import {Term} from "./Term";

export interface Movie {
    _id: string;
    title: string;
    description: string;
    terms: string[] | null;
    pictures: string[];
}
