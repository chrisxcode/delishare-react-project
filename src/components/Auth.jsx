import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState } from 'react';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration successful!');
            setLoggedStatus(true);
        } catch (error) {
            alert('Error:' + error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            alert('Logout successful!');
            setLoggedStatus(false);
        } catch (error) {
            alert('Error:' + error)
        }
    }

    return (
        <div>
            <div>
                {loggedStatus ? <p>User is logged in!</p> : <p>No user logged in.</p>}
            </div>
            <div>
                <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} value={email} />
                <input placeholder="Password..." type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div style={{ margin: '20px' }}>
                <button onClick={signUp}>Sign Up</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );

}