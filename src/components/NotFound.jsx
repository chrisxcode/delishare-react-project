import styles from "./styles/NotFound.module.css"

export const NotFound = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Sorry!</h1>
                <h2>We couldn't find the page you are looking for...</h2>
            </div>
        </div>
    )
}