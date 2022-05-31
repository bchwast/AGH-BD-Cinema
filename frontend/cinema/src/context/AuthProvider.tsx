import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

// @ts-ignore
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('user')!) || {});

    useEffect(() => {
        if (auth) {
            localStorage.setItem('user', JSON.stringify(auth));
        } else {
            localStorage.removeItem('user');
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
