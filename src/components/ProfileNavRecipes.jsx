import { useContext } from "react";
import { ProfileNavContext } from "./ProfileNavigation";
import { SingleRecipe } from "./SingleRecipe";

import styles from "./styles/ProfileNavRecipes.module.css"

export const ProfileNavRecipes = ({
    sortBy
}) => {

    const { recipes, themeColors, userId, currentUser } = useContext(ProfileNavContext);

    let listOfRecipes = [];

    switch (sortBy) {
        case "authored":
            listOfRecipes = currentUser.authored;
            break;
        case "liked":
            listOfRecipes = currentUser.liked;
            break;
        case "saved":
            listOfRecipes = currentUser.saved;
            break;
        case "following":
            listOfRecipes = recipes
                .filter(recipe => currentUser.following.includes(recipe.userId))
                .map(x => x.id);
            break;
        default:
            break;
    }

    return (
        <div className={styles.container}>
            <div className={styles.recipes}>
                {
                    listOfRecipes.length > 0
                        ?
                        listOfRecipes.map(recipe => {
                            let currentRecipe = recipes.find(x => x.id === recipe);
                            console.log(currentRecipe);
                            if (currentRecipe) {
                                return <SingleRecipe key={currentRecipe.id} recipe={currentRecipe} />
                            } else {
                                listOfRecipes = listOfRecipes.filter(x => x.id !== recipe);
                            }
                        })
                        :
                        <p>No recipes yet</p>
                }
            </div>
        </div>
    )
}