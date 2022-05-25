import useAuth from "../../hooks/useAuth";

export const UserPage = () => {
    // @ts-ignore
    const {auth} = useAuth();

    return (
        <>
            <h1>
                You're an user
            </h1>
            <h2>
                Your name: {auth?.firstname + ' ' + auth?.lastname}
            </h2>
        </>
    )
}

export default UserPage;
