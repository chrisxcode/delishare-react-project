import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import styles from "./styles/Login.module.css"

export const Login = ({
    logIn
}) => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setLoggedStatus, themeColors } = useContext(AppContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validCredentials, setValidCredentials] = useState(true);

    const logInHandler = async () => {
        setLoading(true);
        try {
            await logIn(email, password);
            setLoggedStatus(true);
            navigate("/success")
            setTimeout(() => {
                navigate('/')
            }, 1600);

        } catch {
            setValidCredentials(false);
            setLoading(false);
        }


    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    return (
        <div className={styles.wrapper}>
            {loading ?
                (<div className='loaderWrapper'>
                    <span className="loader"></span>
                </div>)
                : (<div className={styles.container}>
                    <div className={styles.input_fields}>
                        <label htmlFor="email">Email</label>
                        <input className={themeColors.primary} id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                        <label htmlFor="password">Password</label>
                        <input className={themeColors.primary} type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className={validCredentials ? styles.valid : styles.invalid}>
                        <p>Incorrect email or password.</p>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.login} onClick={logInHandler}>Login</button>
                        <p>Don't have an account?</p>
                        <button className={styles.register} onClick={navigateToRegister}>Click here to register!</button>
                    </div>
                </div>)}

        </div>
    );

}