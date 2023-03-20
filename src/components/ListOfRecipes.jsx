import { SingleRecipe } from "./SingleRecipe";
import styles from "./styles/ListOfRecipes.module.css"

export const ListOfRecipes = ({ recipes }) => {

    return (
        <div>
            <div className={styles.ListOfRecipes}>

                {recipes.map(recipe => (
                    <SingleRecipe key={recipe.id} recipe={recipe} />
                ))}
            </div>

        </div>
    );

}