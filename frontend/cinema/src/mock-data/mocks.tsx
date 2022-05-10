import {Movie} from "../interfaces/Movie";
import {Term} from "../interfaces/Term";
import {Customer} from "../interfaces/Customer";
import {Place} from "../interfaces/Place";

export const customers: Customer[] = [
    {
        key: '0',
        nick: 'mazik',
        firstname: 'Jakub',
        lastname: 'Maziarz',
        email: 'mazik@mazik.com'
    },
    {
        key: '1',
        nick: 'kulman',
        firstname: 'Jakub',
        lastname: 'Kulman',
        email: 'kulman@kulman.com'
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
        id: '0',
        title: 'Dr Dziwago',
        description: 'Bardzo fajny film',
        terms: null,
        pictures: ['https://pl.jugomobile.com/wp-content/uploads/2022/04/Nowy-zwiastun-Doctor-Strange-2-potwierdza-dwie-powracajace-postacie-MCU.jpg',
            'https://sm.ign.com/ign_pl/screenshot/default/doctor-strange-2-poster_1fuk.jpg']
    },
    {
        id: '1',
        title: 'Morbius',
        description: 'Bardzo słaby film',
        terms: null,
        pictures: ['https://fwcdn.pl/fpo/70/46/817046/7987451.3.jpg',
        'https://m.media-amazon.com/images/M/MV5BOTZjYWJmMTItZTA0NC00MTc4LWJlZGEtZWNlN2RiMzc3NTM1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg']
    }
]
