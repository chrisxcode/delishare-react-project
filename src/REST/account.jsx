import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { createFollowers, createUser } from './users';


export const signUp = async (email, password, newUser) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);

        const userId = auth?.currentUser?.uid

        await createUser({ ...newUser, userId });

        await createFollowers(userId);

        localStorage.setItem("userId", userId);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        localStorage.setItem("userId", auth?.currentUser?.uid);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const logout = async () => {
    try {
        await signOut(auth);

        localStorage.removeItem("userId");
    } catch (error) {
        throw new Error(error.message);
    }
}