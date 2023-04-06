import { db, auth } from '../config/firebase';
import { doc, getDocs, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection } from "firebase/firestore";

const interactionDataRef = collection(db, `recipeInteractions`);

export const getAllRecipeInteractions = async () => {
    try {
        const interactionData = await getDocs(interactionDataRef);
        const filteredInteractionData = interactionData.docs.map(doc => ({ ...doc.data() }));

        return filteredInteractionData;
    } catch (error) {
        alert(error)
    }
}

export const createRecipeInteractionDoc = async (recipeId) => {
    try {
        const recipeInteractionDoc = doc(db, "recipeInteractions", recipeId);
        await setDoc(recipeInteractionDoc,
            { recipeId, likedBy: [], savedBy: [], authorId: auth?.currentUser?.uid });
    } catch (error) {
        alert(error.message);
    }
}

export const deleteRecipeInteractionDoc = async (recipeId) => {
    try {
        const recipeInteractionDoc = doc(db, "recipeInteractions", recipeId);
        await deleteDoc(recipeInteractionDoc);
    } catch (error) {
        alert(error.message)
    }
}

export const like = async (recipeId, likerId, setRecipeChange, setLiked) => {
    try {
        const recipeInteractionsDocRef = doc(db, "recipeInteractions", recipeId);
        await updateDoc(recipeInteractionsDocRef, {
            likedBy: arrayUnion(likerId)
        })

        const personWhoLikes = doc(db, "users", likerId);
        await updateDoc(personWhoLikes, {
            liked: arrayUnion(recipeId)
        })

        setRecipeChange(x => x + 1);

        setLiked(true);
    } catch (error) {
        alert(error.message)
    }
}

export const unlike = async (recipeId, likerId, setRecipeChange, setLiked) => {
    try {
        const recipeInteractionsDocRef = doc(db, "recipeInteractions", recipeId);
        await updateDoc(recipeInteractionsDocRef, {
            likedBy: arrayRemove(likerId)
        })

        const personWhoLikes = doc(db, "users", likerId);
        await updateDoc(personWhoLikes, {
            liked: arrayRemove(recipeId)
        })

        setRecipeChange(x => x + 1);

        setLiked(false);
    } catch (error) {
        alert(error.message)
    }
}

export const save = async (recipeId, likerId, setRecipeChange, setSaved) => {
    try {
        const recipeInteractionsDocRef = doc(db, "recipeInteractions", recipeId);
        await updateDoc(recipeInteractionsDocRef, {
            savedBy: arrayUnion(likerId)
        })

        const personWhoLikes = doc(db, "users", likerId);
        await updateDoc(personWhoLikes, {
            saved: arrayUnion(recipeId)
        })

        setRecipeChange(x => x + 1);

        setSaved(true);
    } catch (error) {
        alert(error.message)
    }
}

export const unsave = async (recipeId, likerId, setRecipeChange, setSaved) => {
    try {
        const recipeInteractionsDocRef = doc(db, "recipeInteractions", recipeId);
        await updateDoc(recipeInteractionsDocRef, {
            savedBy: arrayRemove(likerId)
        })

        const personWhoLikes = doc(db, "users", likerId);
        await updateDoc(personWhoLikes, {
            saved: arrayRemove(recipeId)
        })

        setRecipeChange(x => x + 1);

        setSaved(false);
    } catch (error) {
        alert(error.message)
    }
}
