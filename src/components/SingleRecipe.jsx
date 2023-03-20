
export const SingleRecipe = ({ recipe }) => {
    return (
        <div className="SingleRecipe">
            <h1>{recipe.title}</h1>
            <p>Prep time: {recipe.prepTime} minutes</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>{recipe.instructions}</p>
        </div>
    )
}