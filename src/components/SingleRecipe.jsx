import styles from './styles/SingleRecipe.module.css';
import { Link } from "react-router-dom";

export const SingleRecipe = ({ recipe }) => {

    return (
        <div className={styles.SingleRecipe}>
            <h1>{recipe.title}</h1>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>{recipe.instructions}</p>
            <div>
                <ul>
                    <li><Link className='li' to={recipe.id}>Details</Link></li>
                </ul>
            </div>
        </div>
    )
}