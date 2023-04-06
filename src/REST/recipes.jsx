import { db } from '../config/firebase';
import { doc, getDocs, addDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";
import { createRecipeInteractionDoc, deleteRecipeInteractionDoc } from "./recipeInteractions";
import { addToAuthored, removeFromAuthored } from "./users"

const recipeCollectionRef = collection(db, "recipes");

export const getAllRecipes = async () => {
    try {
        const recipedata = await getDocs(recipeCollectionRef);
        const filteredRecipeData = recipedata.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return filteredRecipeData;
    } catch (error) {
        alert(error)
    }
}

export const createRecipe = async (newRecipe) => {
    try {
        let result = await addDoc(recipeCollectionRef,
            { ...newRecipe, createdOn: serverTimestamp() });

        await createRecipeInteractionDoc(result.id);

        await addToAuthored(newRecipe.userId, result.id);

        return result.id;
    } catch (error) {
        alert(error.message);
    }
}

export const editRecipe = async (recipeId, editedRecipe) => {
    try {
        const recipeDoc = doc(db, "recipes", recipeId);
        await updateDoc(recipeDoc, editedRecipe);
    } catch (error) {
        alert(error.message)
    }
}

export const deleteRecipe = async (userId, recipeId) => {
    try {
        const recipeDoc = doc(db, "recipes", recipeId);
        await deleteDoc(recipeDoc);
        await deleteRecipeInteractionDoc(recipeId);
        await removeFromAuthored(userId, recipeId);
    } catch (error) {
        alert(error.message)
    }
}