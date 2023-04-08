import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import styles from "./styles/Register.module.css"

export const Register = ({
    signUp,
    setUsers
}) => {

    const [loading, setLoading] = useState(false);

    const { setLoggedStatus, themeColors } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');

    const [validation, setValidation] = useState({
        email: true,
        password: true,
        confirmPassword: true,
        description: true
    });

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    const emailValidation = () => {
        if (regex.test(email)) {
            setValidation(state => ({ ...state, email: true }))
            return true;
        } else {
            setValidation(state => ({ ...state, email: false }))
            return false;
        }
    }

    const passwordValidation = () => {
        if (password.length >= 6) {
            setValidation(state => ({ ...state, password: true }))
            return true;
        } else {
            setValidation(state => ({ ...state, password: false }))
            return false;
        }
    }

    const confirmPasswordValidation = () => {
        if (password === confirmPassword && confirmPassword !== "" && confirmPassword.length >= 6) {
            setValidation(state => ({ ...state, confirmPassword: true }))
            return true;
        } else {
            setValidation(state => ({ ...state, confirmPassword: false }))
            return false;
        }
    }

    const descriptionValidation = () => {
        if (description.length >= 30 && description.length <= 138) {
            setValidation(state => ({ ...state, description: true }))
            return true;
        } else {
            setValidation(state => ({ ...state, description: false }));
            return false;
        }
    }

    const registerHandler = () => {
        let isEmailValid = emailValidation();
        let isPasswordValid = passwordValidation();
        let isConfirmPasswordValid = confirmPasswordValidation();
        let isDescriptionValid = descriptionValidation();

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isDescriptionValid) {
            createAccount();
        }
    }

    const createAccount = async () => {
        setLoading(true);
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
        try {
            let userId = await signUp(email, password, newUser);
            setUsers(oldUsers => [...oldUsers, { ...newUser, userId }])
            navigate("/success")
            setTimeout(() => {
                setLoggedStatus(true);
                navigate('/');
            }, 2000);
        } catch (error) {
            alert(error.message)
        }
    }

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (

        <div className={styles.wrapper}>
            {loading
                ?
                (<div className='loaderWrapper'>
                    <span className="loader"></span>
                </div>)
                :
                (<div className={styles.container}>
                    <div className={styles.input_fields}>
                        <label htmlFor="email">Email</label>
                        {!validation.email && <p>(Must be a valid email)</p>}
                        <input id='email'
                            className={(validation.email ? null : styles.wrong) + " " + themeColors.primary}
                            onBlur={() => emailValidation()}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <label htmlFor="password">Password</label>
                        {!validation.password && <p>(Password is too short)</p>}
                        <input type='password'
                            className={(validation.password ? null : styles.wrong) + " " + themeColors.primary}
                            onBlur={() => passwordValidation()}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <label htmlFor="confirm">Confirm Password:</label>
                        {!validation.confirmPassword && <p>(Passwords must match)</p>}
                        <input id="confirm" type='password'
                            className={(validation.confirmPassword ? null : styles.wrong) + " " + themeColors.primary}
                            onBlur={() => confirmPasswordValidation()}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword} />
                        <label htmlFor="description">Tell us about yourself!</label>
                        {(!validation.description && description.length < 30) && <p>
                            (Description is too short)</p>}
                        {(!validation.description && description.length > 138) && <p>(Description is too long)</p>}
                        <textarea name="description" id="description"
                            className={(validation.description ? null : styles.wrong) + " " + themeColors.primary}
                            onBlur={() => descriptionValidation()}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} ></textarea>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.register} onClick={() => registerHandler()}>Register</button>
                        <p>Already have an account?</p>
                        <button className={styles.login} onClick={navigateToLogin}>Click here to login!</button>
                    </div>
                </div>)}

        </div>
    );

}