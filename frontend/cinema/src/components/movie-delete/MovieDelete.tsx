import useAuth from "../../hooks/useAuth";
import {useState} from "react";
import axios, {AxiosError} from "axios";

type Props = {
    movieID: string;
}

export const MovieDelete = ({movieID}: Props) => {
    // @ts-ignore
    const {auth} = useAuth();

    const [errMsg, setErrMsg] = useState('');

    const deleteMovie = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/movies/${movieID}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': auth.token
                    },
                    // @ts-ignore
                    user: {_id: auth.id }
                })
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
                setErrMsg('Movie delete error');
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }

    return (
        <>
            <button onClick={deleteMovie}>Delete</button>
            <p>
                {errMsg ? errMsg : null}
            </p>
        </>
    )
}


export default MovieDelete;
