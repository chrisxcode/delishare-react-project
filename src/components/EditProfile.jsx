import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import styles from "./styles/EditProfile.module.css";
import { editUser } from "../REST/users";

export const EditProfile = ({
    setProfileChange,
    followers
}) => {

    const { currentUserId, users } = useContext(AppContext);
    const navigate = useNavigate();

    const user = users.find(user => user.id === currentUserId);
    const userFollowers = followers.find(f => f.userId === currentUserId).followers;

    const [coverImage, setCoverImage] = useState(user.coverImage);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [username, setUsername] = useState(user.username);
    const [description, setDescription] = useState(user.description);

    const [newCoverImage, setNewCoverImage] = useState(user.coverImage);
    const [newProfilePicture, setNewProfilePicture] = useState(user.profilePicture);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newDescription, setNewDescription] = useState(user.description);


    const [valid, setValid] = useState({
        coverImage: true,
        profilePicture: true,
        username: true,
        description: true
    })

    const allValid = valid.coverImage && valid.profilePicture && valid.username && valid.description;

    const coverPicUrlHandler = async () => {
        try {
            new URL(newCoverImage);
        } catch (err) {
            setValid(state => ({ ...state, coverImage: false }))
            return;
        }
        setValid(state => ({ ...state, coverImage: true }))
        setCoverImage(newCoverImage);
    }

    const profilePicUrlHandler = async () => {
        try {
            new URL(newProfilePicture);
        } catch (err) {
            setValid(state => ({ ...state, profilePicture: false }))
            return;
        }
        setValid(state => ({ ...state, profilePicture: true }))
        setProfilePicture(newProfilePicture);
    }

    const usernameHandler = () => {
        if (newUsername.length < 5) {
            setValid(state => ({ ...state, username: false }))
        } else {
            setValid(state => ({ ...state, username: true }))
            setUsername(newUsername);
        }
    }

    const descriptionHandler = () => {
        if (newDescription.length < 20) {
            setValid(state => ({ ...state, description: false }))
        } else {
            setValid(state => ({ ...state, description: true }))
            setDescription(newDescription);
        }
    }

    const saveChanges = async () => {
        const newChanges = {
            coverImage,
            profilePicture,
            username,
            description
        }
        try {
            await editUser(currentUserId, newChanges, setProfileChange);
            navigate(-1)
        } catch (error) {
            alert(error.message)
        }
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.preview}>
                    <div className={styles.card}>
                        <div className={styles.cover}>
                            <div className={styles.cover_image} style={{ backgroundImage: `url(${coverImage})` }}></div>
                        </div>
                        <div className={styles.profile_image} style={{ backgroundImage: `url(${profilePicture})` }}></div>
                        <div className={styles.user_info}>
                            <h2>@{username}</h2>
                            <p>{description}</p>
                        </div>
                        <div className={styles.activities}>
                            <div className={styles.activity}><p>Recipes</p><p>{user.authored.length}</p></div>
                            <div className={styles.activity}><p>Following</p><p>{user.following.length}</p></div>
                            <div className={styles.activity}><p>Followers</p><p>{userFollowers.length}</p></div>
                        </div>
                    </div>
                </div>
                <div className={styles.data}>
                    <div className={styles.input_container}>

                        <label htmlFor="coverImage">Cover image URL</label>
                        <input className={styles.input} type="text" id="coverImage"
                            onChange={(e) => setNewCoverImage(e.target.value)}
                            onBlur={() => coverPicUrlHandler()}
                            value={newCoverImage} />

                        <label htmlFor="profilePicture">Profile picture URL</label>
                        <input className={styles.input} type="text" id="profilePicture"
                            onChange={(e) => setNewProfilePicture(e.target.value)}
                            onBlur={() => profilePicUrlHandler()}
                            value={newProfilePicture} />

                        <label htmlFor="username">Username</label>
                        <input className={styles.input} type="text" id="username"
                            onChange={(e) => setNewUsername(e.target.value)}
                            onBlur={() => usernameHandler()}
                            value={newUsername} />

                        <label htmlFor="description">Description</label>
                        <input className={styles.input} type="text" id="description"
                            onChange={(e) => setNewDescription(e.target.value)}
                            onBlur={() => descriptionHandler()}
                            value={newDescription} />
                    </div>
                </div>
                <button
                    className={allValid ? styles.save : styles.disabled}
                    onClick={saveChanges}
                    disabled={!allValid}
                >SAVE CHANGES</button>
                <div className={allValid ? styles.invisible : styles.errors}>
                    {!valid.coverImage && <p>Cover image URL is invalid. Please enter a valid URL.</p>}
                    {!valid.profilePicture && <p>Profile picture URL is invalid. Please enter a valid URL.</p>}
                    {!valid.username && <p>Username must be 5 or more characters long.</p>}
                    {!valid.description && <p>Description must be 20 or more characters long.</p>}
                </div>

            </div>
        </div>

    )
}