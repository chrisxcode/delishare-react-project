import { AppContext } from "../App";
import { SingleUserCard } from "./SingleUserCard";
import styles from "./styles/Users.module.css";
import { useContext } from "react";

export const Users = ({
    followers
}) => {

    const { users } = useContext(AppContext);

    return (
        <div>
            <h2>Here are all the users:</h2>
            <div className={styles.container}>
                {users.map(x => <SingleUserCard key={x.userId} user={x} userFollowersData={followers.find(f => f.userId === x.userId)} />)}
            </div>
        </div>
    );

}