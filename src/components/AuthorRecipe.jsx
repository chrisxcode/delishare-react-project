import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, editRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";
import styles from "./styles/AuthorRecipe.module.css"

export const AuthorRecipe = ({ setRecipes, recipes }) => {

    const navigate = useNavigate();
    let { recipeId } = useParams();

    let recipe = {
        title: '',
        imageLink: '',
        difficulty: '',
        prepTime: 0,
        description: '',
        ingredients: [],
        instructions: [],
        likes: 0,
        saves: 0
    }

    if (recipeId) {
        recipe = recipes.find(x => x.id === recipeId);
    }

    const [newIngredient, setNewIngredient] = useState('');
    const [newInstruction, setNewInstruction] = useState('');

    const [title, setTitle] = useState(recipe.title);
    const [imageLink, setImageLink] = useState(recipe.imageLink);
    const [difficulty, setDifficulty] = useState(recipe.difficulty);
    const [prepTime, setPrepTime] = useState(recipe.prepTime);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const onAddIngredient = () => {
        if (newIngredient !== "") {
            setIngredients(ingredients => [...ingredients, newIngredient]);
            setNewIngredient("");
        }
    }

    const onRemoveIngredient = (ingredient) => {
        setIngredients(state => state.filter(x => x !== ingredient))
    }

    const onAddInstruction = () => {
        if (newInstruction !== "") {
            setInstructions(instructions => [...instructions, newInstruction]);
            setNewInstruction("");
        }
    }

    const onRemoveInstruction = (instruction) => {
        setInstructions(state => state.filter(x => x !== instruction));
    }

    const createRecipeHandler = async () => {
        let recipe = {
            title,
            imageLink,
            difficulty,
            prepTime,
            description,
            ingredients,
            instructions,
            likes: 0,
            saves: 0,
            userId: auth?.currentUser?.uid
        }
        let newRecipeId = await createRecipe(recipe); // Creates recipe and returns new recipe ID
        setRecipes(oldRecipes => [...oldRecipes, { ...recipe, id: newRecipeId }]);
        navigate("/recipes");

    }

    const editRecipeHandler = async () => {
        let editedRecipe = {
            title,
            imageLink,
            difficulty,
            prepTime,
            description,
            ingredients,
            instructions,
            likes: 0,
            saves: 0,
            userId: recipe.userId
        }
        await editRecipe(recipeId, editedRecipe);
        setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
        setRecipes(oldRecipes => [...oldRecipes, { ...editedRecipe, id: recipeId }]);
        navigate(`/recipes/${recipeId}`);
    }

    return (

        <div className="recipeWrapper">
            <div className="recipeContainer">
                <h1>{recipeId ? "Edit recipe" : "Create new recipe!"}</h1>

                <h2>Title</h2>
                <input type="text" placeholder="Cake" onChange={(e) => setTitle(e.target.value)} value={title} />

                <h2>Image link</h2>
                <input type="text" placeholder="http://google.com/image.jpg" onChange={(e) => setImageLink(e.target.value)} value={imageLink} />

                <h2>Difficulty</h2>
                <label htmlFor="easy">Easy</label>
                <input type="radio" id="easy" name="difficulty" checked={difficulty === "Easy"} onChange={(e) => setDifficulty(e.target.value)} value="Easy" />
                <label htmlFor="medium">Medium</label>
                <input type="radio" id="medium" name="difficulty" checked={difficulty === "Medium"} onChange={(e) => setDifficulty(e.target.value)} value="Medium" />
                <label htmlFor="hard">Hard</label>
                <input type="radio" id="hard" name="difficulty" checked={difficulty === "Hard"} onChange={(e) => setDifficulty(e.target.value)} value="Hard" />

                <h2>Preparation Time</h2>
                <input type="number" placeholder="25" onChange={(e) => setPrepTime(Number(e.target.value))} value={prepTime} /> <p>Minutes</p>

                <h2>Description</h2>
                <input type="text" placeholder="A very easy and sweet recipe!"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} />

                <h2>Ingredients</h2>
                <div className={styles.ingredient_list}>
                    {ingredients && ingredients.map(x => (
                        <div key={x.substring(0, 20)}>
                            <p>{x}</p>
                            <button onClick={(e) => onRemoveIngredient(e.target.value)} value={x}>x</button>
                        </div>
                    ))}
                </div>
                <input placeholder="200g flour"
                    onChange={(e) => setNewIngredient(e.target.value)}
                    value={newIngredient} />
                <button onClick={onAddIngredient}>Add ingredient</button>

                <h2>Instructions</h2>
                <div className={styles.steps}>
                    {instructions && instructions.map(x => (
                        <div key={x.substring(0, 20)}>
                            <p >{x}</p>
                            <button onClick={(e) => onRemoveInstruction(e.target.value)} value={x}>x</button>
                        </div>
                    ))}
                </div>
                <textarea cols="20" rows="10" placeholder="Mix everything and put in refrigerator for 1 hour."
                    onChange={(e) => setNewInstruction(e.target.value)}
                    value={newInstruction} />
                <button onClick={onAddInstruction}>Add instruction</button>

                <div>
                    {recipeId ?
                        <button onClick={editRecipeHandler}>Edit Recipe</button> :
                        <button onClick={() => createRecipeHandler(recipe)}>Create new recipe</button>}
                </div>

            </div>
        </div>

    );

}