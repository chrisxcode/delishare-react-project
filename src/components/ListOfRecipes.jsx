import { SingleRecipe } from "./SingleRecipe";


export const ListOfRecipes = ({ recipes }) => {

    return (
        <div className="ListOfRecipes">

            {recipes.map(recipe => (
                <SingleRecipe key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );

}