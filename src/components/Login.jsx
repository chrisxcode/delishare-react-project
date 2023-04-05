import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import styles from "./styles/Login.module.css"

export const Login = ({
    logIn
}) => {

    const { setLoggedStatus } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logInHandler = () => {
        logIn(email, password, setLoggedStatus);
    }

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.input_fields}>
                    <label htmlFor="email">Email</label>
                    <input id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className={styles.actions}>
                    <button className={styles.login} onClick={logInHandler}>Login</button>
                    <p>Don't have an account?</p>
                    <button className={styles.register} onClick={navigateToRegister}>Click here to register!</button>
                </div>
            </div>
        </div>
    );

}