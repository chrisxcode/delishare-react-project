import { useState, } from 'react';

export const Auth = ({
    signUp,
    logIn,
    loggedStatus,
    setLoggedStatus
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = () => {
        signUp(email, password, setLoggedStatus);
    }

    const logInHandler = () => {
        logIn(email, password, setLoggedStatus);
    }

    return (
        <div>
            <div>
                <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} value={email} />
                <input placeholder="Password..." type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div style={{ margin: '20px' }}>
                <button onClick={signUpHandler}>Sign Up</button>
                <button onClick={logInHandler}>Log In</button>
            </div>
        </div>
    );

}