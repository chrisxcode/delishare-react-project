import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import styles from "./styles/Register.module.css"

export const Register = ({
    signUp,
    setUsers
}) => {

    const { setLoggedStatus } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');

    const signUpHandler = async () => {
        let newUser = {
            email,
            username: email.split("@")[0],
            profilePicture: "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
            coverImage: "https://i.ibb.co/NLMtRJH/cover-Image.jpg",
            description,
            theme: "default",
            authored: [],
            saved: [],
            liked: [],
            following: []
        }
        let userId = await signUp(email, password, newUser, setLoggedStatus);
        setUsers(oldUsers => [...oldUsers, { ...newUser, userId }])
    }

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.input_fields}>
                    <label htmlFor="email">Email</label>
                    <input id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input id="confirm" type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    <label htmlFor="description">Tell us about yourself!</label>
                    <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} ></textarea>
                </div>
                <div className={styles.actions}>
                    <button className={styles.register} onClick={signUpHandler}>Register</button>
                    <p>Already have an account?</p>
                    <button className={styles.login} onClick={navigateToLogin}>Click here to login!</button>
                </div>
            </div>
        </div>
    );

}