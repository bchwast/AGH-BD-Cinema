import {Button, Form, FormGroup, FormText} from "react-bootstrap";
import React, {useRef, useState, useEffect, FormEvent} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './SignupPage.scss';
import axios, {AxiosError} from "axios";
import {Link} from "react-router-dom";

const nameRegex = /^[a-z ,.'-]+$/i;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;

export const SignupPage = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [passwd, setPasswd] = useState('');
    const [validPasswd, setValidPasswd] = useState(false);
    const [passwdFocus, setPasswdFocus] = useState(false);

    const [matchPasswd, setMatchPasswd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = nameRegex.test(firstname);
        setValidFirstname(result);
    }, [firstname])

    useEffect(() => {
        const result = nameRegex.test(lastname);
        setValidLastname(result);
    }, [lastname])

    useEffect(() => {
        const result = emailRegex.test(mail);
        setValidMail(result);
    }, [mail])

    useEffect(() => {
        const result = passwdRegex.test(passwd);
        setValidPasswd(result);
        const match = passwd === matchPasswd;
        setValidMatch(match);
    }, [passwd, matchPasswd])

    useEffect(() => {
        setErrMsg('');
    }, [mail, passwd, matchPasswd])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const v1 = emailRegex.test(mail);
        const v2 = passwdRegex.test(passwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/auth/register',
                JSON.stringify({
                    firstname,
                    lastname,
                    email: mail,
                    password: passwd
                }),
                {
                    headers: { 'Content-Type': 'application/json'}
                });
            setSuccess(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    // @ts-ignore
                    setErrMsg(err.response.data);
                }
            } else {
                setErrMsg('Signup error');
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <h1>Success!</h1>
                    <p>
                        <Link to='/login'>Log In</Link>
                    </p>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Text>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </Form.Text>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>
                            First name
                            <span className={validFirstname ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validFirstname || !firstname ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </Form.Label>

                        <Form.Control type="text" placeholder="Enter firstname" autoComplete="off"
                                      onChange={(e) => setFirstname(e.target.value)}
                                      required aria-invalid={validFirstname ? "false" : "true"} aria-describedby="fnnote"
                                      onFocus={() => setFirstnameFocus(true)} onBlur={() => setFirstnameFocus(false)}
                                      value={firstname}/>
                        <p id="fnnote" className={(firstnameFocus && firstname && !validFirstname) ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Invalid name format
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>
                            Last name
                            <span className={validLastname ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validLastname || !lastname ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter lastname" autoComplete="off"
                                      onChange={(e) => setLastname(e.target.value)}
                                      required aria-invalid={validLastname ? "false" : "true"} aria-describedby="fnnote"
                                      onFocus={() => setLastnameFocus(true)} onBlur={() => setLastnameFocus(false)}
                                      value={lastname}/>
                        <p id="fnnote" className={(lastnameFocus && lastname && !validLastname) ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Invalid name format
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            Email address
                            <span className={validMail ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validMail || !mail ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={userRef} autoComplete="off"
                                      onChange={(e) => setMail(e.target.value)}
                                      required aria-invalid={validMail ? "false" : "true"} aria-describedby="uidnote"
                                      onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)}
                                      value={mail}/>
                        <p id="uidnote" className={(userFocus && mail && !validMail) ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Invalid email format
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            Password
                            <span className={validPasswd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </span>
                            <span className={validPasswd || !mail ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={passwd}
                                      onChange={(e) => setPasswd(e.target.value)}
                                      required aria-invalid={validPasswd ? "false" : "true"} aria-describedby="pwdnote"
                                      onFocus={() => setPasswdFocus(true)} onBlur={() => setPasswdFocus(false)}/>
                        <p id="passwdnote" className={(passwdFocus && !validPasswd) ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>
                            Confirm Password
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPasswd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPasswd ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" value={matchPasswd}
                                      onChange={(e) => setMatchPasswd(e.target.value)}
                                      required aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote"
                                      onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}/>
                    </Form.Group>
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <Button variant="primary" type="submit" disabled={!validMail || !validPasswd || !validMatch}>
                        Sign Up
                    </Button>

                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Log In</Link>
                        </span>
                    </p>
                </Form>
            )}
        </>
    )
}


export default SignupPage;
