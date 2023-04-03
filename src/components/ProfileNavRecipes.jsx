import { useContext } from "react";
import { ProfileNavContext } from "./ProfileNavigation";
import { SingleRecipe } from "./SingleRecipe";

import styles from "./styles/ProfileNavRecipes.module.css"

export const ProfileNavRecipes = ({
    sortBy
}) => {

    const { recipes, themeColors, userId, currentUser } = useContext(ProfileNavContext);

    let ListOfRecipes = [];

    switch (sortBy) {
        case "authored":
            ListOfRecipes = currentUser.authored;
            break;
        case "liked":
            ListOfRecipes = currentUser.liked;
            break;
        case "saved":
            ListOfRecipes = currentUser.saved;
            break;
        default:
            break;
    }

    return (
        <div className={styles.container}>
            <div className={styles.recipes}>
                {/* <div className={styles.fade} style={{ backgroundImage: `linear-gradient(${themeColors.body}, transparent)` }}></div> */}
                {ListOfRecipes.length > 0
                    ?
                    recipes.map(recipe => {
                        if (sortBy !== "following") {
                            return (ListOfRecipes.includes(recipe.id) ? <SingleRecipe key={recipe.id} recipe={recipe} /> : null)
                        } else {
                            return (currentUser.following.includes(recipe.userId) ? <SingleRecipe key={recipe.id} recipe={recipe} /> : null)
                        }

                    }

                    )
                    :
                    <p>No recipes yet</p>
                }
            </div>
        </div>
    )
}