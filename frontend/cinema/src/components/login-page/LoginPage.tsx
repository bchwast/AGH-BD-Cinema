import {Button, Form} from "react-bootstrap";
import React, {useRef, useState, useEffect, FormEvent, useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";
import axios, {AxiosError} from "axios";


export const LoginPage = () => {
    // @ts-ignore
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [mail, setMail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [mail, passwd])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login',
                JSON.stringify({
                    email: mail,
                    password: passwd
                }),
                {
                    headers: { 'Content-Type': 'application/json'}
                });
            const token = response?.headers?.token;
            const admin = response?.headers?.admin;
            console.log(admin);
            setAuth({mail, passwd, token, admin});
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
                        <Link to='/'>Go to home</Link>
                    </p>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Text>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </Form.Text>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={userRef} autoComplete="off"
                                      onChange={(e) => setMail(e.target.value)}
                                      required value={mail}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter password"
                                      onChange={(e) => setPasswd(e.target.value)}
                                      required value={passwd}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <p>
                        Need an account?<br />
                        <span className="line">
                    <Link to='/signup'>Sign up</Link>
                </span>
                    </p>
                </Form>
            )}
        </>
    )
}


export default LoginPage;
