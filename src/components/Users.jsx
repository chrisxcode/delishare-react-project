import { AppContext } from "../App";
import { SingleUserCard } from "./SingleUserCard";
import styles from "./styles/Users.module.css";
import { useContext, useState } from "react";

export const Users = ({
    followers
}) => {

    const { users } = useContext(AppContext);
    const [search, setSearch] = useState("");

    return (
        <div>
            <div className={styles.search}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users" />
            </div>
            <div className={styles.container}>
                {users.map(user =>
                    user.username.toLowerCase().includes(search.toLowerCase()) ? <SingleUserCard key={user.userId} user={user} userFollowersData={followers.find(f => f.userId === user.userId)} /> : null)}
            </div>
        </div>
    );

}