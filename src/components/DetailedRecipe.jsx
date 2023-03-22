import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";

export const DetailedRecipe = ({ recipes, setRecipes }) => {

    const { recipeId } = useParams();
    const navigate = useNavigate();

    let recipe = recipes.find(x => x.id === recipeId);

    const deleteConfirmation = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            console.log(recipe.userId);
            console.log(auth?.currentUser?.uid);
            await deleteRecipe(recipeId);
            setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
            navigate("/recipes");
        }
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>{recipe.instructions}</p>
            {auth?.currentUser?.uid === recipe.userId &&
                <div>
                    <ul>
                        <li><Link className='li' to="edit">EDIT</Link></li>
                        <ul>
                            <li><button onClick={deleteConfirmation}>DELETE</button></li>
                        </ul>
                    </ul>
                </div>}
        </div>
    )
}