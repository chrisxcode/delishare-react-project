import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { createFollowers, createUser } from './users';


export const signUp = async (email, password, newUser, setLoggedStatus) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful!');
        setLoggedStatus(true);

        const userId = auth?.currentUser?.uid

        await createUser({ ...newUser, userId });

        await createFollowers(userId);

    } catch (error) {
        alert(error.message)
    }
}

export const logIn = async (email, password, setLoggedStatus) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('LogIn successful!');
        setLoggedStatus(true);
    } catch (error) {
        alert(error.message)
    }
}

export const logout = async (setLoggedStatus, setCurrentUserId) => {
    try {
        await signOut(auth);
        alert('Logout successful!');
        setLoggedStatus(false);
        setCurrentUserId(null)
    } catch (error) {
        alert(error.message)
    }
}