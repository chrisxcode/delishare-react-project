import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";

export const CreateRecipe = ({ setRecipes }) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [prepTime, setPrepTime] = useState(0);
    const [instructions, setInstructions] = useState('');

    const onSumbitRecipe = async () => {
        let newRecipe = {
            title,
            difficulty,
            prepTime,
            instructions,
            userId: auth?.currentUser?.uid
        }

        let newRecipeId = await createRecipe(newRecipe); // Creates recipe and returns new recipe ID
        setRecipes(oldRecipes => [...oldRecipes, { ...newRecipe, id: newRecipeId }]);
        navigate("/recipes");
    }

    return (

        <div className="createRecipeWrapper">
            <div className="createRecipeContainer">
                <h1>Create New Recipe!</h1>

                <h2>Title</h2>
                <input type="text" placeholder="Cake" onChange={(e) => setTitle(e.target.value)} value={title} />

                <h2>Difficulty</h2>
                <label htmlFor="easy">Easy</label>
                <input type="radio" id="difficulty" name="difficulty" onChange={(e) => setDifficulty(e.target.value)} value="Easy" />
                <label htmlFor="Medium">Medium</label>
                <input type="radio" id="difficulty" name="difficulty" onChange={(e) => setDifficulty(e.target.value)} value="Medium" />
                <label htmlFor="Hard">Hard</label>
                <input type="radio" id="difficulty" name="difficulty" onChange={(e) => setDifficulty(e.target.value)} value="Hard" />

                <h2>Preparation Time</h2>
                <input type="number" placeholder="25" onChange={(e) => setPrepTime(Number(e.target.value))} value={prepTime} /> <p>Minutes</p>

                <h2>Instructions</h2>
                <input type="text" placeholder="Bake at 250 degrees until ready."
                    onChange={(e) => setInstructions(e.target.value)}
                    value={instructions} />

                <div>
                    <button onClick={onSumbitRecipe}>Submit Recipe</button>
                </div>

            </div>
        </div>

    );

}