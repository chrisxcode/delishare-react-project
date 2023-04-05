import styles from './styles/SingleRecipe.module.css';
import { useNavigate } from "react-router-dom";

export const SingleRecipe = ({ recipe }) => {

    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/recipes/${recipe.id}`);
    }

    return (
        <div className={styles.recipe} onClick={goToDetails}>
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
        </div>
    )
}