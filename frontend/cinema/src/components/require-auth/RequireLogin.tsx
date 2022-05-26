import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {PropsWithChildren} from "react";

interface Props {
    token: string;
}

export const RequireLogin = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location}} replace />
    )
}

export default RequireLogin;
