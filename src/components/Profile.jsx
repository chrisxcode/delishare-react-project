import styles from "./styles/Profile.module.css"

import { useContext, useState } from "react";
import { ProfileNavigation } from "./ProfileNavigation"
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";
import { addFollower, removeFollower } from "../REST/users";

export const Profile = ({
    followers,
    setProfileChange,
    logout
}) => {

    const [loading, setLoading] = useState(false);


    const { setLoggedStatus, themeColors, recipes, currentUserId, setCurrentUserId, users } = useContext(AppContext);

    const { userId } = useParams();
    const navigate = useNavigate();

    const currentUser = users.find(x => x.userId === userId);

    const userFollowersObj = followers?.find(x => x.userId === userId);
    const userFollowers = userFollowersObj?.followers;

    const isThisMyProfile = currentUser?.userId === currentUserId;

    const [followed, setFollowed] = useState(userFollowers.includes(currentUserId));

    const logOutHandler = () => {
        logout(setLoggedStatus, setCurrentUserId)
    }

    const followHandler = async () => {
        await addFollower(currentUser.userId, currentUserId, setProfileChange);
        setFollowed(true);
    }

    const unfollowHandler = async () => {
        await removeFollower(currentUser.userId, currentUserId, setProfileChange);
        setFollowed(false);
    }

    const editProfileHandler = () => {
        navigate("edit");
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.profile}><div className={styles.cover}>
                    <div className={styles.cover_image} style={{ backgroundImage: `url(${currentUser.coverImage})` }}></div>
                </div>
                    <div className={styles.profile_image} style={{ backgroundImage: `url(${currentUser.profilePicture})` }}></div>
                    <div className={styles.user_info}>
                        <h2>@{currentUser.username}</h2>
                        <p>{currentUser.description}</p>
                    </div>
                    <div className={styles.activities}>
                        <div className={styles.activity}><p>Recipes</p><p>{currentUser.authored.length}</p></div>
                        <div className={styles.activity}><p>Following</p><p>{currentUser.following.length}</p></div>
                        <div className={styles.activity}><p>Followers</p><p>{userFollowers.length}</p></div>
                    </div></div>
                {currentUserId &&
                    <div>
                        {isThisMyProfile ?
                            <div className={styles.control_panel}>
                                <ul>
                                    <li onClick={editProfileHandler}>Edit Profile</li>
                                    <li>Change theme</li>
                                    <li onClick={logOutHandler}>Logout</li>
                                </ul>
                            </div>
                            :
                            <div className={styles.follow}>
                                <ul onClick={followed ? unfollowHandler : followHandler}>
                                    {followed ?
                                        <li>Unfollow</li>
                                        :
                                        <li>Follow</li>}
                                </ul>
                            </div>}
                    </div>


                }
            </div>

            <div className={styles.main}>
                <div className={styles.navigation}>
                    <ul className={styles.links}>
                        <li><Link className={styles.link} to="authored">authored</Link></li>
                        <li><Link className={styles.link} to="liked">liked</Link></li>
                        <li><Link className={styles.link} to="saved">saved</Link></li>
                        <li><Link className={styles.link} to="following">following</Link></li>
                    </ul>
                </div>
                <ProfileNavigation themeColors={themeColors} recipes={recipes} userId={userId} currentUser={currentUser} />
            </div>

        </div>

    );
}