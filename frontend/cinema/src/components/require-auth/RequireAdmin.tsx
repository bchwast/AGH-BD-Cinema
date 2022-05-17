import useAuth from "../../hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export const RequireAdmin = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.admin
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location}} replace />
    )
}

export default RequireAdmin;
