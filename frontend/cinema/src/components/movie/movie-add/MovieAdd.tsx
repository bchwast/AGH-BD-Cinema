import {Button, Card, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import axios, {AxiosError} from "axios";
import useAuth from "../../../hooks/useAuth";
import './MovieAdd.scss';

const stringRegex = /^[A-Za-z ,.'"-]+$/i;

export const MovieAdd = () => {
    // @ts-ignore
    const {auth, setAuth} = useAuth();

    const movieRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [title, setTitle] = useState('');
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [pictures, setPictures] = useState<string[]>([]);
    const [validPictures, setValidPictures] = useState(false);
    const [picturesFocus, setPicturesFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const setPicture = (i: number, pic: string) => {
        const data = [...pictures];
        data[i] = pic;
        setPictures(data);
    }

    const addPictureField = () => {
        const data = [...pictures];
        data.push('');
        setPictures(data);
    }

    const removePictureField = (i: number) => {
        const data = [...pictures];
        data.splice(i, 1);
        setPictures(data);
    }

    const clearEmptyPictures = () => {
        const data = pictures.filter(pic => pic !== '');
        setPictures(data);
    }

    useEffect(() => {
        // @ts-ignore
        movieRef.current.focus();
    }, []);

    useEffect(() => {
        const result = stringRegex.test(title);
        setValidTitle(result);
    }, [title]);

    useEffect(() => {
        const result = stringRegex.test(description);
        setValidDescription(result);
    }, [description]);

    useEffect(() => {
        const result = pictures.length > 0;
        setValidPictures(result);
    }, [pictures]);

    useEffect(() => {
        setErrMsg('');
    }, [title, description, pictures]);

    useEffect(() => {
        if (success) {
            setTitle('');
            setDescription('');
            setPictures([]);
            setSuccess(false);
        }
    }, [success])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const v1 = stringRegex.test(title);
        const v2 = stringRegex.test(description);
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            clearEmptyPictures();
            const response = await axios.post('http://localhost:8080/movies',
                JSON.stringify({
                    title: title,
                    description: description,
                    terms: [],
                    pictures: pictures
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
                } else if (err.response?.status === 418) {
                    console.log('Token has expired');
                    setAuth({});
                }
            } else {
                setErrMsg('Movie add error');
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

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>
                    Title
                    <span className={validTitle ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                    <span className={validTitle || !title ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                </Form.Label>

                <Form.Control type="text" placeholder="Enter title" autoComplete="off" ref={movieRef}
                              onChange={(e) => setTitle(e.target.value)}
                              required aria-invalid={validTitle ? "false" : "true"} aria-describedby="fnnote"
                              onFocus={() => setTitleFocus(true)} onBlur={() => setTitleFocus(false)}
                              value={title}/>
                <p id="fnnote" className={(titleFocus && title && !validTitle) ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Invalid title format
                </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>
                    Description
                    <span className={validDescription ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                    <span className={validDescription || !description ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter description" autoComplete="off"
                              onChange={(e) => setDescription(e.target.value)}
                              required aria-invalid={validDescription ? "false" : "true"} aria-describedby="fnnote"
                              onFocus={() => setDescriptionFocus(true)} onBlur={() => setDescriptionFocus(false)}
                              value={description}/>
                <p id="fnnote" className={(descriptionFocus && description && !validDescription) ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Invalid name format
                </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPictures">
                <Form.Label>
                    Pictures
                    <span className={validPictures ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                    <span className={validPictures || !pictures ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                </Form.Label>
                <Form.Group className="mb-3">
                    {pictures.map((pic, i) => (
                        <>
                            <Form.Control type="text" placeholder="Enter link" autoComplete="off"
                                          onChange={(e) => setPicture(i, e.target.value)}
                                          required aria-invalid={validPictures ? "false" : "true"} aria-describedby="uidnote"
                                          onFocus={() => setPicturesFocus(true)} onBlur={() => setPicturesFocus(false)}
                                          value={pic} key={i}/>
                            <button type="button" onClick={() => removePictureField(i)}>Remove picture</button>
                            {pic !== '' ? <Card><Card.Img src={pic} variant="top"/></Card> : null}
                        </>
                    ))}
                    <button type="button" onClick={addPictureField}>Add picture</button>
                    <p id="uidnote" className={(picturesFocus && pictures && !validPictures) ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        At least one picture is required
                    </p>
                </Form.Group>

            </Form.Group>


            <Button variant="primary" type="submit" disabled={!validTitle || !validDescription || !validPictures}>
                Add movie
            </Button>
        </Form>
    )
}


export default MovieAdd;