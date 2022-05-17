import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const RequireLogout = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.token
            ? <Navigate to="/error" state={{ from: location}} replace />
            : <Outlet />
    )
}

export default RequireLogout;
