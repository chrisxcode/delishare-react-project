import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

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
        <div>
            <div>
                <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} value={email} />
                <input placeholder="Password..." type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div style={{ margin: '20px' }}>
                <button onClick={logInHandler}>Log In</button>
                <p>Don't have an account?</p>
                <button onClick={navigateToRegister}>Click here to register!</button>
            </div>
        </div>
    );

}