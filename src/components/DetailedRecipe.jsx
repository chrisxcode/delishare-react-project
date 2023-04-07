import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteRecipe } from "../REST/recipes";
import { auth } from "../config/firebase";
import styles from "./styles/DetailedRecipe.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { like, save, unlike, unsave } from "../REST/recipeInteractions";

export const DetailedRecipe = ({
    setRecipeChange
}) => {

    const { recipes, setRecipes, users, currentUserId, themeColors } = useContext(AppContext);

    const [confirmationModal, setconfirmationModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { recipeId } = useParams();
    const navigate = useNavigate();

    let recipe = recipes.find(x => x.id === recipeId);
    let author = users.find(user => user.userId === recipe.userId);
    let currentUser = users.find(user => user.userId === currentUserId);

    const [liked, setLiked] = useState(currentUser?.liked.includes(recipeId));
    const [saved, setSaved] = useState(currentUser?.saved.includes(recipeId));

    const deleteConfirmation = async () => {
        setLoading(true);
        try {
            const userId = auth?.currentUser?.uid;
            await deleteRecipe(userId, recipeId);
            setRecipes(oldRecipes => oldRecipes.filter(x => x.id !== recipeId));
            navigate("/success")
            setTimeout(() => {
                navigate("/recipes");
            }, 2000);
        } catch (error) {
            alert(error.message)
        }

    }

    const likeHandler = async () => {
        if (liked === true) {
            await unlike(recipeId, currentUserId, setRecipeChange, setLiked);
        } else {
            await like(recipeId, currentUserId, setRecipeChange, setLiked);
        }
    }

    const saveHandler = async () => {
        if (saved === true) {
            await unsave(recipeId, currentUserId, setRecipeChange, setSaved);
        } else {
            await save(recipeId, currentUserId, setRecipeChange, setSaved);
        }
    }

    return (
        <div className={styles.wrapper}>
            {loading ?
                (<div className='loaderWrapper'>
                    <span className="loader"></span>
                </div>)
                : <>
                    {confirmationModal
                        ? <div className={styles.confirmationModal}>
                            <h2 >Are you sure you want to delete this recipe?</h2>
                            <button className={styles.yesButton} onClick={() => deleteConfirmation()}>DELETE</button>
                            <button className={styles.noButton} onClick={() => setconfirmationModal(false)}>GO BACK</button>
                        </div>
                        : (<div className={styles.container + " " + themeColors.opacity}>
                            <div className={styles.header + " " + themeColors.primary}>
                                <h1>{recipe.title}</h1>
                                <h4>Submitted by<li onClick={() => navigate(`/profile/${author.userId}`)}>@{author.username}</li></h4>
                            </div>
                            <img src={recipe.imageLink} alt="" />
                            <div className={styles.details + " " + themeColors.primary}>
                                <p><i className="fa-solid fa-clock"></i> {recipe.prepTime} minutes</p>
                                <p>Difficulty: {recipe.difficulty}</p>
                            </div>
                            <div className={styles.ingredients + " " + themeColors.primary}>
                                <h2>Ingredients:</h2>
                                {recipe.ingredients.map(x => <p key={x.substring(0, 20)}>{x}</p>)}
                            </div>
                            <div className={styles.instructions + " " + themeColors.primary}>
                                <h2>Instructions:</h2>
                                {recipe.instructions.map(x => <p key={x.substring(0, 20)}>{x}</p>)}
                            </div>
                            {currentUserId &&
                                <div>
                                    {auth?.currentUser?.uid === recipe.userId ?
                                        <div className={styles.author}>
                                            <ul>
                                                <li className={styles.edit}><Link to="edit"><i className="fa-solid fa-pen"></i></Link></li>
                                                <li className={styles.delete}><button onClick={() => setconfirmationModal(true)}><i className="fa-solid fa-trash"></i></button></li>
                                            </ul>
                                        </div>
                                        :
                                        <div className={styles.author}>
                                            <ul>
                                                <li className={liked ? styles.liked : styles.like}><button onClick={likeHandler}><i className="fa-regular fa-heart"></i></button></li>
                                                <li className={saved ? styles.saved : styles.save}><button onClick={saveHandler}><i className="fa-regular fa-bookmark"></i></button></li>
                                            </ul>
                                        </div>
                                    }
                                </div>}
                        </div>)}</>}
        </div >
    )
}