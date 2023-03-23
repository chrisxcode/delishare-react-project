import { db } from '../config/firebase';
import { doc, addDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";

const recipeCollectionRef = collection(db, "recipes");

export const createRecipe = async (newRecipe) => {
    try {
        let result = await addDoc(recipeCollectionRef,
            { ...newRecipe, createdOn: serverTimestamp() });
        alert('Recipe created successfully!')
        return result.id;
    } catch (error) {
        alert(error.message);
    }
}

export const editRecipe = async (recipeId, editedRecipe) => {
    try {
        const recipeDoc = doc(db, "recipes", recipeId);
        await updateDoc(recipeDoc, editedRecipe);
        alert('Recipe edited successfully!');
    } catch (error) {
        alert(error.message)
    }
}

export const deleteRecipe = async (recipeId) => {
    try {
        const recipeDoc = doc(db, "recipes", recipeId);
        await deleteDoc(recipeDoc);
        alert('Recipe deleted successfully!')
    } catch (error) {
        alert(error.message)
    }
}