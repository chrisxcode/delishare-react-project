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

        const userId = auth?.currentUser?.uid

        await createUser({ ...newUser, userId });

        await createFollowers(userId);

        alert('Registration successful!')

        setLoggedStatus(true);

    } catch (error) {
        alert(error.message)
    }
}

export const logIn = async (email, password, setLoggedStatus) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setLoggedStatus(true);
    } catch (error) {
        throw new Error;
    }
}

export const logout = async (setLoggedStatus, setCurrentUserId) => {
    try {
        await signOut(auth);
        setLoggedStatus(false);
        setCurrentUserId(null)
    } catch (error) {
        alert(error.message)
    }
}