import { db, auth } from '../config/firebase';
import { doc, getDocs, setDoc, collection } from "firebase/firestore";

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
        alert('InteractionDoc created successfully!')
    } catch (error) {
        alert(error.message);
    }
}

// delete recipe interaction doc
