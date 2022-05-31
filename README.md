# Aplikacja do obsługi kina

Bartłomiej Chwast, Piotr Kowalczyk, Magdalena Królikowska

## Charakterystyka aplikacji

Celem naszej aplikacji jest obsługa usług związanych z zarządzaniem kinem. Do głównych funkcjonalności należą: umożliwienie użytkownikom stworzenie kont i na ich podstawie rezerwacji miejsc na określone seanse. Admin może przeglądać użytkowników oraz dodawać, edytować i usuwać filmy, terminy i rezerwacje.

## Technologie:
- **React**
- **ExpressJS**
- **MongoDB**

## Struktura bazy danych

Baza danych zawiera 3 kolekcje:

- **movies** - zawiera filmy dostępne w programie filmowym kina
  - title - String - tytuł filmu
  - description - String - opis filmu
  - terms - Array - tablica dostępnych terminów deansów dla danego filmu
  - pictures - Array - tablica zdjęć reklamujących dany film
  
- **terms** - przechowuje terminy seansów danego filmu
  - date - Date - data seansu
  - totalPlaces - Int32 - całkowita liczba miejsc
  - freePlaces - Int32 - liczba dostępnych do rezerwacji miejsc
  - movie - ObjectId - identyfikator filmu na który dokonywana jest rezerwacja
  
- **users** - przechowuje dane o użytkownikach, którzy założyli konto na stronie internetowej kina
  - firstname - String - imię użytkownika
  - lastname - String - nazwisko użytkownika
  - email - String - email
  - password - String - hasło w postaci zaszyfrowanej
  - admin - Boolean - rozstrzyga, czy użytkownik ma uprawnienia administratora
  - reservations - Array - tablica przechowująca obiekty reprezentujące rezerwacje
    - movie - Object - film, na który dokonano rezerwacji
    - customer - identyfikator klienta
    - term - identyfikator terminu
    - numberOfPlaces - Int32 - liczba zarezerwowanych miejsc

 ### Przykładowe dane
  - **movies** 
      ```
      {
      "_id": {
        "$oid": "628d0e40a10e7e00e8b9baf0"
      },
      "title": "Joker",
      "description": "Genialna produkcja",
      "terms": [
        {
          "$oid": "628d0ed9daa9ee4b79bdf11a"
        },
        {
          "$oid": "628e62fcb130b4b8ba3422f0"
        },
        {
          "$oid": "628f5987c8490d6fc11499f2"
        },
        {
          "$oid": "628f88544e71b8cf21f2998b"
        }
      ],
      "pictures": [
        "https://fwcdn.pl/fpo/01/67/810167/7905225.3.jpg",
        "https://fwcdn.pl/fph/01/67/810167/833479_1.3.jpg"
      ],
      "__v": 3
    } 

  - **terms**
    ```
    {
      "_id": {
        "$oid": "628d0ed9daa9ee4b79bdf11a"
      },
      "date": {
        "$date": {
          "$numberLong": "1656084720000"
        }
      },
      "totalPlaces": 45,
      "__v": 0,
      "freePlaces": 45
    },{
      "_id": {
        "$oid": "628e637eb130b4b8ba3446c9"
      },
      "date": {
        "$date": {
          "$numberLong": "1653316380000"
        }
      },
      "totalPlaces": 50,
      "freePlaces": 50,
      "__v": 0
    }

- **users** 
  ```{
  "_id": {
    "$oid": "628d0ffa0a91d6f19c7403e6"
  },
  "firstname": "Jakub",
  "lastname": "Maziarz",
  "email": "mazik@gazik.com",
  "password": "$2a$10$b/2flNNIFDtxRsZq709cA.z2zvKemgWpZjt1T6jn8Ej4ezSKd/Sfq",
  "admin": true,
  "reservations": [
    {
      "movie": {
        "title": "Joker",
        "movieRef": {
          "$oid": "628d0e40a10e7e00e8b9baf0"
        }
      },
      "customer": {
        "$oid": "628d0ffa0a91d6f19c7403e6"
      },
      "term": {
        "$oid": "628f88544e71b8cf21f2998b"
      },
      "numberOfPlaces": 13,
      "_id": {
        "$oid": "628f9d235b83d529a02fd1a4"
      }
    }
        
## Frontend
## Backend
