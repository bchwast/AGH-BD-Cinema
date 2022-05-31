import {useParams} from "react-router-dom";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import {Button, Card, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import "./TermAdd.scss";
import axios, {AxiosError} from "axios";

const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/;

export const TermAdd = () => {
    const {id} = useParams();

    // @ts-ignore
    const {auth} = useAuth();

    const termRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [date, setDate] = useState('');
    const [validDate, setValidDate] = useState(false);
    const [dateFocus, setDateFocus] = useState(false);

    const [totalPlaces, setTotalPlaces] = useState(0);
    const [validPlaces, setValidPlaces] = useState(false);
    const [placesFocus, setPlacesFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // @ts-ignore
        termRef.current.focus();
    }, []);

    useEffect(() => {
        const result = dateRegex.test(date);
        setValidDate(result);
    }, [date]);

    useEffect(() => {
        const result = totalPlaces > 0;
        setValidPlaces(result);
    }, [totalPlaces]);

    useEffect(() => {
        setErrMsg('');
    }, [date, totalPlaces]);

    useEffect(() => {
        if (success) {
            setDate('')
            setTotalPlaces(0);
            setSuccess(false);
        }
    }, [success])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const v1 = dateRegex.test(date);
        const v2 = totalPlaces > 0;
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response1 = await axios.post(`http://localhost:8080/movies/${id}/addterm`,
                JSON.stringify({
                    date: date,
                    totalPlaces: totalPlaces,
                    freePlaces: totalPlaces
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
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    // @ts-ignore
                    setErrMsg(err.response.data);
                }
            } else {
                setErrMsg('Add term error');
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

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>
                    Date
                    <span className={validDate ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                    <span className={validDate || !date ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                </Form.Label>

                <Form.Control type="datetime-local" placeholder="Enter title" autoComplete="off" ref={termRef}
                              onChange={(e) => setDate(e.target.value)}
                              required aria-invalid={validDate ? "false" : "true"} aria-describedby="fnnote"
                              onFocus={() => setDateFocus(true)} onBlur={() => setDateFocus(false)}
                              value={date} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"/>
                <p id="fnnote" className={(dateFocus && date && !validDate) ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Invalid date format
                </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTotalPlaces">
                <Form.Label>
                    Total Places
                    <span className={validPlaces ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                    <span className={validPlaces || !totalPlaces ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                </Form.Label>
                <Form.Control type="number" placeholder="Enter description" autoComplete="off"
                              onChange={(e) => setTotalPlaces(parseInt(e.target.value, 10))}
                              required aria-invalid={validPlaces ? "false" : "true"} aria-describedby="fnnote"
                              onFocus={() => setPlacesFocus(true)} onBlur={() => setPlacesFocus(false)}
                              value={totalPlaces}/>
                <p id="fnnote" className={(placesFocus && totalPlaces && !validPlaces) ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Total Places need to be positive
                </p>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!validDate || !validPlaces}>
                Add term
            </Button>
        </Form>
    )
}
