import { Link } from "react-router-dom";
import styles from "./styles/Header.module.css";

export const Header = ({
    themeColors,
    loggedStatus
}) => {

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
                        <li><Link className={styles.user} to="/profile">Profile</Link></li>
                        : <li><Link className={styles.guest} to="/auth">Login</Link></li>}
                </ul>
            </nav>
        </div>
    )


}