

export const Profile = ({
    setLoggedStatus,
    logout
}) => {

    const logOutHandler = () => {
        logout(setLoggedStatus)
    }

    return (
        <div>
            <h1>User Profile</h1>
            <li className="navLink"><button onClick={logOutHandler}>Logout</button></li>
        </div>

    );
}