import { useContext } from "react"
import styles from "./styles/Home.module.css"
import { AppContext } from "../App"

export const Home = () => {

    const { themeColors } = useContext(AppContext);

    return (
        <div className={styles.home_wrapper}>
            <div className={styles.container}>
                <svg viewBox="0 0 960 300">
                    <symbol id="s-text">
                        <text textAnchor="middle" x="50%" y="80%">DELISHARE</text>
                        {/* <text textAnchor="middle" x="50%" y="80%">DELISHARE</text> */}

                    </symbol>

                    <g class="g-ants">
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                        <use xlinkHref="#s-text" className={styles.textcopy} style={{ stroke: themeColors.logo }}></use>
                    </g>
                </svg>
                <div>
                    <h2 style={{ color: themeColors.logo }}>Share Delicious recipes with people around the world!</h2>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card + " " + themeColors.primary}>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <h3>Create Recipes</h3>
                        <p>Everyone has their own special comfort foods. Share your unique taste with people around the world!</p>
                        <div className={styles.shine}></div>
                    </div>
                    <div className={styles.card + " " + themeColors.primary}>
                        <i class="fa-solid fa-heart"></i>
                        <h3>Like and Save</h3>
                        <p>Give love to delicious-looking recipes and keep your favorite ones in your profile for when you need them!</p>
                        <div className={styles.shine}></div>
                    </div>
                    <div className={styles.card + " " + themeColors.primary}>
                        <i class="fa-solid fa-user-plus"></i>
                        <h3>Follow Authors</h3>
                        <p>Like what people are sharing? We've made it easy to keep up your favorite authors' new recipes!</p>
                        <div className={styles.shine}></div>
                    </div>
                    <div className={styles.card + " " + themeColors.primary}>
                        <i class="fa-solid fa-sliders"></i>
                        <h3>Customize your Experience</h3>
                        <p>Make yourself stand out! Create a unique profile and make DeliShare your own with custom themes!</p>
                        <div className={styles.shine}></div>
                    </div>
                </div>
            </div>
        </div>


    )


}