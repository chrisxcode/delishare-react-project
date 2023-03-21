import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';


export const signUp = async (email, password, setLoggedStatus) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful!');
        setLoggedStatus(true);
    } catch (error) {
        alert('Error:' + error)
    }
}

export const logIn = async (email, password, setLoggedStatus) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('LogIn successful!');
        setLoggedStatus(true);
    } catch (error) {
        alert('Error:' + error)
    }
}

export const logout = async (setLoggedStatus) => {
    try {
        await signOut(auth);
        alert('Logout successful!');
        setLoggedStatus(false);
    } catch (error) {
        alert('Error:' + error)
    }
}