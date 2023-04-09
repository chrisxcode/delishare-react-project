import { useContext } from "react";
import { ProfileNavContext } from "./ProfileNavigation";
import { SingleRecipe } from "./SingleRecipe";

import styles from "./styles/ProfileNavRecipes.module.css"

export const ProfileNavRecipes = ({
    sortBy
}) => {

    const { recipes, userProfile } = useContext(ProfileNavContext);

    let listOfRecipes = [];

    switch (sortBy) {
        case "authored":
            listOfRecipes = userProfile.authored;
            break;
        case "liked":
            listOfRecipes = userProfile.liked;
            break;
        case "saved":
            listOfRecipes = userProfile.saved;
            break;
        case "following":
            listOfRecipes = recipes
                .filter(recipe => userProfile.following.includes(recipe.userId))
                .map(x => x.id);
            break;
        default:
            break;
    }

    if (listOfRecipes.length > 0) {
        listOfRecipes = listOfRecipes.filter(recipe => {
            let currentRecipe = recipes.find(x => x.id === recipe);
            if (currentRecipe) {
                return recipe;
            }
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.recipes}>
                {
                    listOfRecipes.length > 0
                        ?
                        listOfRecipes.map(recipe => {
                            let currentRecipe = recipes.find(x => x.id === recipe);
                            return <SingleRecipe key={currentRecipe.id} recipe={currentRecipe} />
                        })
                        :
                        <div className={styles.empty}>
                            <h3 className={styles.animated}>Nothing here yet...</h3>
                        </div>
                }
            </div>
        </div>
    )
}