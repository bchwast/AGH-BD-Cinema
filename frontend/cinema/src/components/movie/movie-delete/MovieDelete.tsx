import useAuth from "../../../hooks/useAuth";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    movieID: string;
}

export const MovieDelete = ({movieID}: Props) => {
    // @ts-ignore
    const {auth, setAuth} = useAuth();

    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

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
            navigate("/movies");
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
