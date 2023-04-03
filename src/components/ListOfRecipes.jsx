import { SingleRecipe } from "./SingleRecipe";
import styles from "./styles/ListOfRecipes.module.css";
import { useContext } from "react";
import { AppContext } from "../App";

export const ListOfRecipes = () => {

    const { recipes, themeColors } = useContext(AppContext);

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input type="text" />
                <button>Search</button>
            </div>
            <div className={styles.filters}>
                <h1>Filters</h1>
                <label htmlFor="easy">Easy</label>
                <input type="checkbox" id="easy" defaultValue="Easy" />
                <label htmlFor="medium">Medium</label>
                <input type="checkbox" id="medium" defaultValue="Medium" />
                <label htmlFor="easy">Medium</label>
                <input type="checkbox" id="hard" defaultValue="Hard" />
            </div>
            <div className={styles.recipes}>
                <div className={styles.fade} style={{ backgroundImage: `linear-gradient(${themeColors.body}, transparent)` }}></div>
                {recipes.map(recipe => (
                    <SingleRecipe key={recipe.id} recipe={recipe} />
                ))}
            </div>

        </div>
    );

}