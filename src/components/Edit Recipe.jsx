import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";

export const EditRecipe = ({ setRecipes, recipes }) => {

    const { recipeId } = useParams();
    const navigate = useNavigate();

    let recipe = recipes.find(x => x.id === recipeId);

    const [title, setTitle] = useState(recipe.title);
    const [difficulty, setDifficulty] = useState(recipe.difficulty);
    const [prepTime, setPrepTime] = useState(recipe.prepTime);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const onSumbitRecipe = async () => {
        let editedRecipe = {
            title,
            difficulty,
            prepTime,
            instructions,
            userId: recipe.userId
        }

        console.log(auth?.currentUser?.uid);
        console.log(recipe.userId);

        await editRecipe(recipeId, editedRecipe);
        setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
        setRecipes(oldRecipes => [...oldRecipes, { ...editedRecipe, id: recipeId }]);
        navigate(`/recipes/${recipeId}`);
    }

    return (

        <div className="editRecipeWrapper">
            <div className="editRecipeContainer">
                <h1>Edit Recipe!</h1>

                <h2>Title</h2>
                <input type="text" placeholder="Cake" onChange={(e) => setTitle(e.target.value)} value={title} />

                <h2>Difficulty</h2>
                <label htmlFor="easy">Easy</label>
                <input type="radio" id="easy" name="difficulty" checked={difficulty === "Easy"} onChange={(e) => setDifficulty(e.target.value)} value="Easy" />
                <label htmlFor="medium">Medium</label>
                <input type="radio" id="medium" name="difficulty" checked={difficulty === "Medium"} onChange={(e) => setDifficulty(e.target.value)} value="Medium" />
                <label htmlFor="hard">Hard</label>
                <input type="radio" id="hard" name="difficulty" checked={difficulty === "Hard"} onChange={(e) => setDifficulty(e.target.value)} value="Hard" />

                <h2>Preparation Time</h2>
                <input type="number" placeholder="25" onChange={(e) => setPrepTime(Number(e.target.value))} value={prepTime} /> <p>Minutes</p>

                <h2>Instructions</h2>
                <input type="text" placeholder="Bake at 250 degrees until ready."
                    onChange={(e) => setInstructions(e.target.value)}
                    value={instructions} />

                <div>
                    <button onClick={onSumbitRecipe}>Confirm changes</button>
                </div>

            </div>
        </div>

    );

}