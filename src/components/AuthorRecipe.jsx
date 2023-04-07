import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, editRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";
import styles from "./styles/AuthorRecipe.module.css";
import { useContext } from "react";
import { AppContext } from "../App";

export const AuthorRecipe = () => {

    const [loading, setLoading] = useState(false);

    const { setRecipes, recipes, themeColors } = useContext(AppContext);

    const navigate = useNavigate();
    let { recipeId } = useParams();

    let recipe = {
        title: '',
        imageLink: 'https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg',
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
        setLoading(true)
        let userId = auth?.currentUser?.uid;
        let recipe = {
            title,
            imageLink,
            difficulty,
            prepTime,
            description,
            ingredients,
            instructions,
            userId
        }
        let recipeId = await createRecipe(recipe); // Creates recipe and returns new recipe ID
        setRecipes(oldRecipes => [...oldRecipes, { ...recipe, id: recipeId }]);
        navigate('/success')
        setTimeout(() => {
            navigate(`/recipes/${recipeId}`);
        }, 2000);
        setLoading(false);
    }

    const editRecipeHandler = async () => {
        setLoading(true);
        let editedRecipe = {
            title,
            imageLink,
            difficulty,
            prepTime,
            description,
            ingredients,
            instructions,
            userId: recipe.userId
        }
        await editRecipe(recipeId, editedRecipe);
        setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
        setRecipes(oldRecipes => [...oldRecipes, { ...editedRecipe, id: recipeId }]);
        navigate('/success')
        setTimeout(() => {
            navigate(`/recipes/${recipeId}`);
        }, 2000);
    }

    return (

        <div className={styles.wrapper}>
            {loading ?
                (<div className='loaderWrapper'>
                    <span className="loader"></span>
                </div>)
                : (<div className={styles.container + " " + themeColors.opacity}>
                    <h1>{recipeId ? "Edit recipe" : "Create new recipe!"}</h1>
                    <div className={styles.header + " " + themeColors.primary}>

                        <textarea type="text" placeholder="Recipe title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>

                    <div className={styles.description + " " + themeColors.primary}>
                        <h2>Description</h2>
                        <textarea className={themeColors.opacity} type="text" placeholder="A very easy and sweet recipe!"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} />
                    </div>

                    <div className={styles.image + " " + themeColors.primary}>
                        <img src={imageLink} alt="" />
                        <h2>Image link</h2>
                        <input className={themeColors.opacity} type="text" placeholder="http://google.com/image.jpg" onChange={(e) => setImageLink(e.target.value)} value={imageLink} />
                    </div>

                    <div className={styles.details + " " + themeColors.primary}>

                        <div className={styles.difficulty + " " + themeColors.opacity}>
                            <h2>Difficulty</h2>
                            <div>
                                <input type="radio" id="easy" name="difficulty" checked={difficulty === "Easy"} onChange={(e) => setDifficulty(e.target.value)} value="Easy" />
                                <label htmlFor="easy">Easy</label>
                            </div>
                            <div>
                                <input type="radio" id="medium" name="difficulty" checked={difficulty === "Medium"} onChange={(e) => setDifficulty(e.target.value)} value="Medium" />
                                <label htmlFor="medium">Medium</label>
                            </div>
                            <div>
                                <input type="radio" id="hard" name="difficulty" checked={difficulty === "Hard"} onChange={(e) => setDifficulty(e.target.value)} value="Hard" />
                                <label htmlFor="hard">Hard</label>
                            </div>
                        </div>

                        <div className={styles.preparation_time + " " + themeColors.opacity}>
                            <h2>Preparation time</h2>
                            <div>
                                <input className={themeColors.opacity} type="number" placeholder="25" onChange={(e) => setPrepTime(Number(e.target.value))} value={prepTime} />
                                <p>minutes</p>
                            </div>
                        </div>
                    </div>


                    <div className={styles.ingredients + " " + themeColors.primary}>
                        <h2>Ingredients</h2>
                        <div className={styles.ingredient_list}>
                            {ingredients && ingredients.map(x => (
                                <div className={styles.ingredient} key={x.substring(0, 20)}>
                                    <p>{x}</p>
                                    <button onClick={(e) => onRemoveIngredient(e.target.value)} value={x}>x</button>
                                </div>
                            ))}
                        </div>
                        <input className={themeColors.opacity} placeholder="write ingredient here"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient} />
                        <button onClick={onAddIngredient}>Add ingredient</button>
                    </div>

                    <div className={styles.instructions + " " + themeColors.primary}>
                        <h2>Instructions</h2>
                        <div className={styles.steps}>
                            {instructions && instructions.map(x => (
                                <div className={styles.instruction} key={x.substring(0, 20)}>
                                    <p>{x}</p>
                                    <button onClick={(e) => onRemoveInstruction(e.target.value)} value={x}>x</button>
                                </div>
                            ))}
                        </div>
                        <textarea className={themeColors.opacity} placeholder="write instruction here"
                            onChange={(e) => setNewInstruction(e.target.value)}
                            value={newInstruction} />
                        <button onClick={onAddInstruction}>Add instruction</button>
                    </div>


                    <div className={styles.confirmation}>
                        {recipeId ?
                            <button className={themeColors.primary} onClick={editRecipeHandler}>Edit Recipe</button> :
                            <button className={themeColors.primary} onClick={() => createRecipeHandler(recipe)}>Create new recipe</button>}
                    </div>

                </div>)}
        </div>

    );

}