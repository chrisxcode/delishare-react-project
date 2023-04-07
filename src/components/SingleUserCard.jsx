import { useContext } from "react";
import { AppContext } from "../App";
import styles from "./styles/SingleUserCard.module.css"

import { useNavigate } from "react-router-dom";

export const SingleUserCard = ({
    user,
    userFollowersData
}) => {

    const userFollowers = userFollowersData.followers;

    const navigate = useNavigate();
    const { themeColors } = useContext(AppContext);

    const openUserProfile = () => {
        navigate(`/profile/${user.userId}`)
    }

    return (
        <div onClick={openUserProfile} className={styles.card}>
            <div className={styles.cover}>
                <div className={styles.cover_image} style={{ backgroundImage: `url(${user.coverImage})` }}></div>
            </div>
            <div className={styles.profile_image} style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
            <div className={styles.user_info + " " + themeColors.primary}>
                <h2>@{user.username}</h2>
                <div className={styles.description_container}>
                    <p>{user.description}</p>
                </div>
            </div>
            <div className={styles.activities + " " + themeColors.primary}>
                <div className={styles.activity}><p>Recipes</p><p>{user.authored.length}</p></div>
                <div className={styles.activity}><p>Following</p><p>{user.following.length}</p></div>
                <div className={styles.activity}><p>Followers</p><p>{userFollowers.length}</p></div>
            </div>
        </div>
    );

}