import styles from './styles/SingleRecipe.module.css';
import { Link } from "react-router-dom";
import { style } from '@mui/system';

export const SingleRecipe = ({ recipe }) => {

    return (
        <div className={styles.recipe}>
            <div className={styles.upper_half}>
                <h1>{recipe.title}</h1>
            </div>
            <div className={styles.bg_image} style={{ backgroundImage: `url(${recipe.imageLink})` }}>

            </div>
            <div className={styles.information}>
                <p>Prep time: {recipe.prepTime} minutes</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <p>{recipe.description}</p>
            </div>
            <div>
                <ul>
                    <li><Link className={styles.details} to={recipe.id}>Details</Link></li>
                </ul>
            </div>
        </div>
    )
}