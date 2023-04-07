import { db } from '../config/firebase';
import { doc, getDoc, setDoc, getDocs, updateDoc, collection, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore";

const userCollectionRef = collection(db, "users");
const followersCollectionRef = collection(db, "followers");

export const getAllUsers = async () => {
    try {
        const userdata = await getDocs(userCollectionRef);
        const filteredUserData = userdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return filteredUserData;
    } catch (error) {
        alert(error)
    }
}

export const createUser = async (newUser) => {
    try {
        const userDoc = doc(db, "users", newUser.userId);
        await setDoc(userDoc,
            { ...newUser, memberSince: serverTimestamp() });
    } catch (error) {
        alert(error.message)
    }
}

export const editUser = async (userId, updatedInfo, setProfileChange) => {
    try {
        const profileOwner = doc(db, "users", userId);
        await updateDoc(profileOwner, {
            ...updatedInfo
        })
        setProfileChange(state => state + 1);
    } catch (error) {
        alert(error.message)
    }
}

export const addToAuthored = async (userId, recipeId) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const newUserInfo = { ...userDocSnap.data(), authored: [...userDocSnap.data().authored, recipeId] };

            await updateDoc(userDocRef, newUserInfo);

        } else {
            alert('The author does not exist');
        }

    } catch (error) {
        alert(error.message)
    }
}

export const removeFromAuthored = async (userId, recipeId) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const newUserInfo = {
                ...userDocSnap.data(), authored:
                    [...userDocSnap.data().authored.filter(x => x !== recipeId)]
            };

            await updateDoc(userDocRef, newUserInfo);
        } else {
            alert('The author does not exist');
        }

    } catch (error) {
        alert(error.message)
    }
}

export const createFollowers = async (userId) => {
    try {
        const followersDoc = doc(db, "followers", userId);
        await setDoc(followersDoc, { followers: [] });
    } catch (error) {
        alert(error.message)
    }
}

export const getAllFollowers = async () => {
    try {
        const followerData = await getDocs(followersCollectionRef);
        const filteredFollowerData = followerData.docs.map(doc => ({ ...doc.data(), userId: doc.id }));

        return filteredFollowerData;
    } catch (error) {
        alert(error)
    }
}

export const addFollower = async (profileId, followerId, setProfileChange) => {
    try {
        const followersDocRef = doc(db, "followers", profileId);
        await updateDoc(followersDocRef, {
            followers: arrayUnion(followerId)
        })

        const follower = doc(db, "users", followerId);
        await updateDoc(follower, {
            following: arrayUnion(profileId)
        })

        setProfileChange(x => x + 1);
    } catch (error) {
        alert(error.message)
    }
}

export const removeFollower = async (profileId, followerId, setProfileChange) => {
    try {
        const followersDocRef = doc(db, "followers", profileId);
        await updateDoc(followersDocRef, {
            followers: arrayRemove(followerId)
        })

        const follower = doc(db, "users", followerId);
        await updateDoc(follower, {
            following: arrayRemove(profileId)
        })

        setProfileChange(x => x + 1);
    } catch (error) {
        alert(error.message)
    }
}

export const changeTheme = async (userId, theme, setProfileChange) => {
    try {
        const profileOwner = doc(db, "users", userId);
        await updateDoc(profileOwner, {
            theme
        })
        setProfileChange(state => state + 1);
    } catch (error) {
        throw new Error(error.message);
    }
}