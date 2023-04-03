import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";
import styles from "./styles/DetailedRecipe.module.css";
import { useContext } from "react";
import { AppContext } from "../App";

export const DetailedRecipe = () => {

    const { recipes, setRecipes, users } = useContext(AppContext);

    const { recipeId } = useParams();
    const navigate = useNavigate();

    let recipe = recipes.find(x => x.id === recipeId);
    let currentUser = users.find(user => user.userId === recipe.userId);

    const deleteConfirmation = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            const userId = auth?.currentUser?.uid;
            await deleteRecipe(userId, recipeId);
            setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
            navigate("/recipes");
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{recipe.title}</h1>
                    <h4>Submitted by @{currentUser.username}</h4>
                </div>
                <img src={recipe.imageLink} alt="" />
                <div className={styles.details}>
                    <p>Prep time: {recipe.prepTime} minutes</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                </div>
                <div className={styles.ingredients}>
                    <h2>Ingredients:</h2>
                    {recipe.ingredients.map(x => <p key={x.substring(0, 20)}>{x}</p>)}
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    {recipe.instructions.map(x => <p key={x.substring(0, 20)}>{x}</p>)}
                </div>
                {auth?.currentUser?.uid === recipe.userId &&
                    <div className={styles.author}>
                        <ul>
                            <li className={styles.edit}><Link to="edit"><i className="fa-solid fa-pen"></i></Link></li>
                            <li className={styles.delete}><button onClick={deleteConfirmation}><i className="fa-solid fa-trash"></i></button></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}