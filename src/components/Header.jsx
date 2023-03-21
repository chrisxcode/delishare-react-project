import { Link } from "react-router-dom";
import styles from "./styles/Header.module.css";

export const Header = ({
    setLoggedStatus,
    loggedStatus,
    logout
}) => {

    const logOutHandler = () => {
        logout(setLoggedStatus)
    }

    return (
        <div className={styles.navContainer}>
            <div className="userStatus">
                {loggedStatus ? <p>- User is logged in -</p> : <p>- No user logged in -</p>}
            </div>
            <nav className="navigation">
                <ul>
                    <li className="navLink"><Link to="/">Home</Link></li>
                    <li className="navLink"><Link to="/recipes">Recipes</Link></li>
                    {loggedStatus ?
                        <><li className="navLink"><Link to="/profile">Profile</Link></li>
                            <li className="navLink"><button onClick={logOutHandler}>Logout</button></li></>
                        : <li className="navLink"><Link to="/auth">Login</Link></li>}
                </ul>
            </nav>
        </div>
    )


}