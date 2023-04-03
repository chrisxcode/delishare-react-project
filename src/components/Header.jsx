import { Link } from "react-router-dom";
import styles from "./styles/Header.module.css";
import { useContext } from "react";
import { AppContext } from "../App";


export const Header = ({ userId }) => {

    const { themeColors, loggedStatus } = useContext(AppContext);

    return (
        <div className={styles.header} style={{ backgroundColor: themeColors.header }}>
            <nav className={styles.navigation}>
                <div className={styles.logo}>
                    <Link to="/">DeliShare</Link>
                </div>
                <ul className={styles.links}>
                    <li><Link className={styles.link} to="/">Home</Link></li>
                    <li><Link className={styles.link} to="/recipes">Recipes</Link></li>
                    <li><Link className={styles.link} to="/users">Users</Link></li>
                    {loggedStatus && <li><Link className={styles.link} to="/create">Create</Link></li>}
                </ul>
                <ul className={styles.profile}>
                    {loggedStatus ?
                        <li><Link className={styles.user} to={`/profile/${userId}`}>Profile</Link></li>
                        : <li><Link className={styles.guest} to="/login">Login</Link></li>}
                </ul>
            </nav>
        </div>
    )


}