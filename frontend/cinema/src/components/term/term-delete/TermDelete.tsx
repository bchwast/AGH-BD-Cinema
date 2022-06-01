import useAuth from "../../../hooks/useAuth";
import {useState} from "react";
import axios, {AxiosError} from "axios";

type Props = {
    termID: string;
    update: any;
}

export const TermDelete = ({termID, update}: Props) => {
    // @ts-ignore
    const {auth, setAuth} = useAuth();
    const [errMsg, setErrMsg] = useState('');

    const deleteTerm = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/terms/${termID}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': auth.token
                    },
                    // @ts-ignore
                    user: {_id: auth.id }
                })
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
                setErrMsg('Term delete error');
            }
        }
    }

    return (
        <>
            <button onClick={deleteTerm}>Delete</button>
            <p>
                {errMsg ? errMsg : null}
            </p>
        </>
    )
}