import { SingleRecipe } from "./SingleRecipe";
import styles from "./styles/ListOfRecipes.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";

export const ListOfRecipes = () => {

    const { recipes, themeColors } = useContext(AppContext);

    const [search, setSearch] = useState("");

    const [difficulty, setDifficulty] = useState({
        Easy: true,
        Medium: true,
        Hard: true
    })

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input className={themeColors.primary} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes" />
            </div>
            <div className={styles.filters}>
                <h1>Filters</h1>
                <div className={styles.difficulty + " " + themeColors.primary}>
                    <h3>Difficulty</h3>
                    <div className={themeColors.gradient}>
                        <input type="checkbox" checked={difficulty.Easy} id="easy" value={difficulty.Easy} onChange={() => setDifficulty(state => ({ ...state, Easy: !state.Easy }))} />
                        <label htmlFor="easy">Easy</label>
                    </div>
                    <div className={themeColors.gradient}>
                        <input type="checkbox" checked={difficulty.Medium} id="medium" value={difficulty.Medium} onChange={() => setDifficulty(state => ({ ...state, Medium: !state.Medium }))} />
                        <label htmlFor="medium">Medium</label>
                    </div>
                    <div className={themeColors.gradient}>
                        <input type="checkbox" checked={difficulty.Hard} id="hard" value={difficulty.Hard} onChange={() => setDifficulty(state => ({ ...state, Hard: !state.Hard }))} />
                        <label htmlFor="easy">Hard</label>
                    </div>
                </div>
            </div>
            <div className={styles.recipes}>
                {recipes.sort((a, b) => b.createdOn - a.createdOn).map(recipe => (
                    recipe.title.toLowerCase().includes(search.toLowerCase())
                        && difficulty[recipe.difficulty] === true
                        ? <SingleRecipe key={recipe.id} recipe={recipe} /> : null
                ))}
            </div>

        </div>
    );

}