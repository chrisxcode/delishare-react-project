import { useContext } from 'react';
import styles from './styles/SingleRecipe.module.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';

export const SingleRecipe = ({ recipe }) => {

    const { themeColors } = useContext(AppContext);

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
            <div className={styles.information + " " + themeColors.primary}>
                <div className={styles.information_wrapper}>
                    <p className={styles.prep_time}>{recipe.prepTime} minutes</p>
                    <p className={styles.difficulty}>{recipe.difficulty}</p>
                    <p className={styles.description}>{recipe.description}</p>
                </div>

            </div>
        </div>
    )
}