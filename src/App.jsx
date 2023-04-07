import './App.css';

import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import { auth } from "./config/firebase"

import { signUp, logIn, logout } from "./REST/account";
import { getAllRecipes } from "./REST/recipes";
import { getAllRecipeInteractions } from "./REST/recipeInteractions";
import { getAllFollowers, getAllUsers } from "./REST/users"

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from './components/Login';
import { ListOfRecipes } from './components/ListOfRecipes';
import { AuthorRecipe } from './components/AuthorRecipe';
import { Profile } from './components/Profile';
import { DetailedRecipe } from './components/DetailedRecipe';
import { NotFound } from './components/NotFound';
import { Users } from './components/Users';
import { Register } from './components/Register';
import { EditProfile } from './components/EditProfile';
import { Success } from './components/Success';
import { ChangeTheme } from './components/ChangeTheme';

// CONTEXT
export const AppContext = createContext(null);

function App() {

    const themes = {
        blue: {
            name: "blue",
            primary: "bluePrimary",
            secondary: "blueSecondary",
            gradient: "blueGradient",
            opacity: "blueOpacity",
            text: "white"
        },
        green: {
            name: "green",
            primary: "greenPrimary",
            secondary: "greenSecondary",
            gradient: "greenGradient",
            opacity: "greenOpacity",
            text: "#ede0e3"
        },
        orange: {
            name: "orange",
            primary: "orangePrimary",
            secondary: "orangeSecondary",
            gradient: "orangeGradient",
            opacity: "orangeOpacity",
            text: "#ede0e3"
        },
        dark: {
            name: "dark",
            primary: "darkPrimary",
            secondary: "darkSecondary",
            gradient: "darkGradient",
            opacity: "darkOpacity",
            text: "#b7aeb2"
        },
        purple: {
            name: "purple",
            primary: "purplePrimary",
            secondary: "purpleSecondary",
            gradient: "purpleGradient",
            opacity: "purpleOpacity",
            text: "#f5eff7"
        },
        gold: {
            name: "gold",
            primary: "goldPrimary",
            secondary: "goldSecondary",
            gradient: "goldGradient",
            opacity: "goldOpacity",
            text: "#f5eff7"
        }
    }

    // THEME

    // const [themeColors, setThemeColors] = useState({ header: "#e76f51", body: "#f4a261" })
    // const [themeColors, setThemeColors] = useState({ header: "#00111c", body: "#001a2c" })
    // const [themeColors, setThemeColors] = useState({ header: "#191528", body: "#3c162f" })

    // FOLLOWERS - Create state for all followers

    const [followers, setFollowers] = useState([]);


    // USER - Initialize states, which will hold user logged in status and Id
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);
    const [currentUserId, setCurrentUserId] = useState(auth?.currentUser?.uid);
    const [loggedInUser, setLoggedInUser] = useState({});

    // INTERACTIONS - Set state to register when a profile/recipe information has been changed

    const [profileChange, setProfileChange] = useState(0);
    const [recipeChange, setRecipeChange] = useState(0);

    const [recipeInteractions, setRecipeInteractions] = useState([]);

    // RECIPES - Create state for recipe collection
    const [recipes, setRecipes] = useState([]);

    // ALL USERS - Create state for all users

    const [users, setUsers] = useState([]);
    const [themeColors, setThemeColors] = useState(themes[loggedInUser?.theme] || themes.orange);

    // ALL USERS - Fetch all users data and save it in the users state

    useEffect(() => {
        const getUsers = async () => {
            let all = await getAllUsers();
            setUsers(all);
        }
        getUsers();

    }, [recipes, profileChange, recipeChange]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedStatus(auth?.currentUser);
                setCurrentUserId(auth?.currentUser?.uid);
                setLoggedInUser(users?.find(x => x.userId === currentUserId))
                setThemeColors(themes[loggedInUser?.theme] || themes.orange);
            } else {
                setThemeColors(themes.orange);
            }
        });
    }, [users, currentUserId, loggedInUser]);

    useEffect(() => {

    }, [users, currentUserId, loggedStatus, loggedInUser])

    useEffect(() => {
        const getRecipesHandler = async () => {
            let all = await getAllRecipes();
            setRecipes(all);
        }
        getRecipesHandler();
    }, []);


    useEffect(() => {
        const getRecipeInteractions = async () => {
            let all = await getAllRecipeInteractions();
            setRecipeInteractions(all);
        }
        getRecipeInteractions();
    }, [recipeChange]);


    useEffect(() => {
        const getFollowers = async () => {
            let all = await getAllFollowers();
            setFollowers(all);
        }
        getFollowers();
    }, [profileChange, loggedStatus]);

    return (
        <AppContext.Provider value={{
            themeColors,
            recipes,
            setRecipes,
            loggedStatus,
            setLoggedStatus,
            currentUserId,
            setCurrentUserId,
            users
        }}>
            <div className="App" style={{ color: themeColors.text }}>

                <Header userId={currentUserId} />

                <div id='body' className={themeColors.gradient} >

                    <Routes>
                        <Route path="/login" element={<Login
                            logIn={logIn} />} />
                        <Route path="/register" element={<Register
                            signUp={signUp}
                            setUsers={setUsers} />} />
                        <Route path="/recipes" element={<ListOfRecipes />} />
                        <Route path="/recipes/:recipeId" element={<DetailedRecipe
                            setRecipeChange={setRecipeChange} />} />
                        <Route path="/recipes/:recipeId/edit" element={<AuthorRecipe />} />
                        <Route path="/create" element={<AuthorRecipe />} />
                        <Route path="/profile/:userId/edit" exact element={<EditProfile
                            followers={followers}
                            setProfileChange={setProfileChange} />} />
                        <Route path="/profile/:userId/theme" exact element={<ChangeTheme
                            themes={themes}
                            setThemeColors={setThemeColors}
                            setProfileChange={setProfileChange} />} />
                        <Route path="/profile/:userId/*" element={<Profile
                            followers={followers}
                            setProfileChange={setProfileChange}
                            logout={logout} />} />
                        <Route path="/users" element={<Users
                            followers={followers} />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" exact element={<Home />} />
                        <Route path="/success" element={<Success />} />
                    </Routes>

                </div>



            </div >
        </AppContext.Provider>
    );




}

export default App;
