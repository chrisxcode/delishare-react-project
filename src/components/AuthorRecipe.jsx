import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, editRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";
import styles from "./styles/AuthorRecipe.module.css";
import { useContext } from "react";
import { AppContext } from "../App";

export const AuthorRecipe = () => {

    const { setRecipes, recipes, themeColors } = useContext(AppContext);
    const navigate = useNavigate();

    let { recipeId } = useParams();

    let recipe = {
        title: '',
        imageLink: 'https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg',
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

    const [loading, setLoading] = useState(false);

    const [newIngredient, setNewIngredient] = useState('');
    const [newInstruction, setNewInstruction] = useState('');

    const [title, setTitle] = useState(recipe.title);
    const [imageLink, setImageLink] = useState(recipe.imageLink);
    const [difficulty, setDifficulty] = useState(recipe.difficulty);
    const [prepTime, setPrepTime] = useState(recipe.prepTime);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const [allValid, setAllValid] = useState(true);

    const [validation, setValidation] = useState({
        title: true,
        imageLink: true,
        difficulty: true,
        prepTime: true,
        description: true,
        ingredients: true,
        instructions: true
    })


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
        if (!validationCheck()) {
            setAllValid(false);
            return;
        } else {
            setAllValid(true);
        }

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
        }, 1600);
        setLoading(false);
    }

    const editRecipeHandler = async () => {
        if (!validationCheck()) {
            setAllValid(false);
            return;
        } else {
            setAllValid(true);
        }

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
        }, 1500);
    }

    const validationCheck = () => {

        let validation = {};

        if (title.length >= 10 && title.length <= 60) {
            setValidation(state => ({ ...state, title: true }));
            validation.title = true;
        } else {
            setValidation(state => ({ ...state, title: false }));
            validation.title = false;
        }

        if (description.length >= 60 && description.length <= 240) {
            setValidation(state => ({ ...state, description: true }));
            validation.description = true;
        } else {
            setValidation(state => ({ ...state, description: false }));
            validation.description = false;
        }

        try {
            new URL(imageLink);
            setValidation(state => ({ ...state, imageLink: true }));
            validation.imageLink = true;
        } catch (err) {
            setValidation(state => ({ ...state, imageLink: false }));
            validation.imageLink = false;
        }

        if (difficulty !== "") {
            setValidation(state => ({ ...state, difficulty: true }));
            validation.difficulty = true;
        } else {
            setValidation(state => ({ ...state, difficulty: false }));
            validation.difficulty = false;
        }

        if (prepTime > 0) {
            setValidation(state => ({ ...state, prepTime: true }));
            validation.prepTime = true;
        } else {
            setValidation(state => ({ ...state, prepTime: false }));
            validation.prepTime = false;
        }

        if (ingredients.length >= 2) {
            setValidation(state => ({ ...state, ingredients: true }));
            validation.ingredients = true;
        } else {
            setValidation(state => ({ ...state, ingredients: false }));
            validation.ingredients = false;
        }

        if (instructions.length >= 3) {
            setValidation(state => ({ ...state, instructions: true }));
            validation.instructions = true;
        } else {
            setValidation(state => ({ ...state, instructions: false }));
            validation.instructions = false;
        }

        if (Object.values(validation).includes(false)) {
            return false;
        } else {
            return true;
        }
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
                        {!validation.title && <div className={styles.error}><p>Title should be between 10 and 60 characters long.</p></div>}
                    </div>

                    <div className={styles.description + " " + themeColors.primary}>
                        <h2>Description</h2>
                        <textarea className={themeColors.opacity} type="text" placeholder="A very easy and sweet recipe!"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} />
                        {!validation.description && <div className={styles.error}><p>Description should be between 60 and 240 characters long.</p></div>}
                    </div>

                    <div className={styles.image + " " + themeColors.primary}>
                        <img src={imageLink} alt="" />
                        <h2>Image link</h2>
                        <input className={themeColors.opacity} type="text" placeholder="http://google.com/image.jpg" onChange={(e) => setImageLink(e.target.value)} value={imageLink} />
                        {!validation.imageLink && <div className={styles.error}><p>Image link should be a valid URL.</p></div>}
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

                        {!validation.difficulty && <div className={styles.error}><p>Difficulty should have a set value.</p></div>}
                        {!validation.prepTime && <div className={styles.error}><p>Preparation time can't be 0 minutes.</p></div>}
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
                        {!validation.ingredients && <div className={styles.error}><p>A recipe should contain at least 2 ingredients.</p></div>}
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
                        {!validation.instructions && <div className={styles.error}><p>A recipe should contain at least 3 instruction steps.</p></div>}
                    </div>
                    {!allValid &&
                        <div className={styles.error} style={{ backgroundColor: themeColors.primary }}>
                            <p>Please check the provided information for errors.</p>
                        </div>}

                    <div className={styles.confirmation}>
                        {recipeId ?
                            <button className={themeColors.primary} onClick={editRecipeHandler}>Edit Recipe</button> :
                            <button className={themeColors.primary} onClick={createRecipeHandler}>Create new recipe</button>}
                    </div>

                </div>)}
        </div>

    );

}