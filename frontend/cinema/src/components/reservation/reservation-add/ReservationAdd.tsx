import {Term} from "../../../interfaces/Term";
import useAuth from "../../../hooks/useAuth";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import axios, {AxiosError} from "axios";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import "./ReservationAdd.scss";

type Props = {
    term: Term;
    update: any
}

export const ReservationAdd = ({term, update}: Props) => {
    // @ts-ignore
    const {auth, setAuth} = useAuth();

    const placesRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [places, setPlaces] = useState(0);
    const [validPlaces, setValidPlaces] = useState(false);
    const [placesFocus, setPlacesFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const result = places > 0 && term.freePlaces >= places;
        setValidPlaces(result);
    }, [places, term.freePlaces]);

    useEffect(() => {
        setErrMsg('');
    }, [places]);

    useEffect(() => {
        setPlaces(0);
        setSuccess(false);
    }, [success]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const v1 = places > 0;
        const v2 = term.freePlaces >= places;
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/users/${auth?.id}/reservations`,
                JSON.stringify({
                    term: term._id,
                    numberOfPlaces: places,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': auth.token
                    },
                    // @ts-ignore
                    user: {_id: auth.id }
                })
            setSuccess(true);
            update(false);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    // @ts-ignore
                    setErrMsg(err.response.data);
                } else if (err.response?.status === 418) {
                    console.log('Token has expired');
                    setAuth({});
                }
            } else {
                setErrMsg('Add reservation error');
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Text>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                    Number of places
                </Form.Label>
                <Form.Control type="number" placeholder="Enter number of places" ref={placesRef} autoComplete="off"
                              onChange={(e) => setPlaces(parseInt(e.target.value, 10))}
                              onFocus={() => setPlacesFocus(true)} onBlur={() => setPlacesFocus(false)}
                              aria-invalid={validPlaces ? "false" : "true"} aria-describedby="fnnote"
                              required value={places}/>
                <p id="fnnote" className={(placesFocus && places && !validPlaces) ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Number of places must be positive and not exceed free places.
                </p>
            </Form.Group>

            <Button variant="primary" type="submit">
                Add reservation
            </Button>
        </Form>
    )
}
