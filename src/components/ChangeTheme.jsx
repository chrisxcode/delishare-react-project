import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import styles from './styles/ChangeTheme.module.css'
import { changeTheme } from '../REST/users';
import { useNavigate, useParams } from 'react-router-dom';

export const ChangeTheme = ({
    themes,
    setThemeColors,
    setProfileChange }) => {

    const { themeColors } = useContext(AppContext);

    const [loading, setLoading] = useState(false);

    const [anyChangesMade, setAnyChangesMade] = useState(false);

    const originalThemeColor = themeColors.name;

    useEffect(() => {
        return () => { setThemeColors(themes[originalThemeColor]) };

    }, [])

    const navigate = useNavigate();



    const [selectedTheme, setSelectedTheme] = useState(themeColors.name);

    const { userId } = useParams();

    const selectHandler = (e) => {
        let selected = e.target.id;
        setThemeColors(themes[selected]);
        setSelectedTheme(selected);
        setAnyChangesMade(true);
    }

    const saveChangesHandler = async () => {
        setLoading(true);
        try {
            await changeTheme(userId, selectedTheme, setProfileChange);
            navigate("/success");
            setTimeout(() => {
                navigate(-2);
            }, 2000);
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    }

    return (
        <div className={styles.wrapper}>
            {loading ?
                (<div className='loaderWrapper'>
                    <span className="loader"></span>
                </div>)
                : (<div className={styles.container}>
                    <div className={styles.palletes}>
                        <div className={styles.pallete_wrapper}>
                            <div id="dark" onClick={(e) => selectHandler(e)} className={styles.pallete + " " + styles.dark + " " + themes.dark.gradient}></div>
                        </div>
                        <div className={styles.pallete_wrapper}>
                            <div id="gold" onClick={(e) => selectHandler(e)} className={styles.pallete + " " + styles.gold + " " + themes.gold.gradient}></div>
                        </div>
                        <div className={styles.pallete_wrapper}>
                            <div id="blue" onClick={(e) => selectHandler(e)} className={styles.pallete + " " + styles.blue + " " + themes.blue.gradient}></div>
                        </div>
                        <div className={styles.pallete_wrapper}>
                            <div id="green" onClick={(e) => selectHandler(e)} className={styles.pallete + " " + styles.green + " " + themes.green.gradient}></div>
                        </div>
                        <div className={styles.pallete_wrapper}>
                            <div id="purple" onClick={(e) => selectHandler(e)} className={styles.pallete + " " + styles.purple + " " + themes.purple.gradient}></div>
                        </div>
                    </div>
                    <button onClick={saveChangesHandler} className={styles.save + " " + themeColors.primary}>SAVE CHANGES</button>
                </div>)}
        </div>
    )
}