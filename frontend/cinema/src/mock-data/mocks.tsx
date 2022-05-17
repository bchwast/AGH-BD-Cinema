import {Movie} from "../interfaces/Movie";
import {Term} from "../interfaces/Term";
import {Customer} from "../interfaces/Customer";
import {Place} from "../interfaces/Place";

export const customers: Customer[] = [
    {
        _id: '0',
        firstname: 'Jakub',
        lastname: 'Maziarz',
        email: 'mazik@mazik.com',
        admin: false
    },
    {
        _id: '1',
        firstname: 'Jakub',
        lastname: 'Kulman',
        email: 'kulman@kulman.com',
        admin: true
    }
]

// export const strange1Places: Place[] = [
//     {
//         place: 1,
//         type: 'child'
//     },
//     {
//         place: 2,
//         type: 'adult'
//     }
// ]


// export const strangeTerms: Term[]

export const movies: Movie[] = [
    {
        _id: '0',
        title: 'Dr Dziwago',
        description: 'Bardzo fajny film',
        terms: null,
        pictures: ['https://pl.jugomobile.com/wp-content/uploads/2022/04/Nowy-zwiastun-Doctor-Strange-2-potwierdza-dwie-powracajace-postacie-MCU.jpg',
            'https://sm.ign.com/ign_pl/screenshot/default/doctor-strange-2-poster_1fuk.jpg']
    },
    {
        _id: '1',
        title: 'Morbius',
        description: 'Bardzo słaby film',
        terms: null,
        pictures: ['https://fwcdn.pl/fpo/70/46/817046/7987451.3.jpg',
        'https://m.media-amazon.com/images/M/MV5BOTZjYWJmMTItZTA0NC00MTc4LWJlZGEtZWNlN2RiMzc3NTM1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg']
    }
]
