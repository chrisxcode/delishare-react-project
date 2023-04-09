import './App.css';

import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

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
            text: "white",
            logo: "#142138"
        },
        green: {
            name: "green",
            primary: "greenPrimary",
            secondary: "greenSecondary",
            gradient: "greenGradient",
            opacity: "greenOpacity",
            text: "#ede0e3",
            logo: "#1b4332"
        },
        orange: {
            name: "orange",
            primary: "orangePrimary",
            secondary: "orangeSecondary",
            gradient: "orangeGradient",
            opacity: "orangeOpacity",
            text: "#ede0e3",
            logo: "#ede0e3"
        },
        dark: {
            name: "dark",
            primary: "darkPrimary",
            secondary: "darkSecondary",
            gradient: "darkGradient",
            opacity: "darkOpacity",
            text: "#d6ced1",
            logo: "#d6ced1"
        },
        purple: {
            name: "purple",
            primary: "purplePrimary",
            secondary: "purpleSecondary",
            gradient: "purpleGradient",
            opacity: "purpleOpacity",
            text: "#f5eff7",
            logo: "#3c096c"
        },
        gold: {
            name: "gold",
            primary: "goldPrimary",
            secondary: "goldSecondary",
            gradient: "goldGradient",
            opacity: "goldOpacity",
            text: "#f5eff7",
            logo: "#242423"
        }
    }

    const [followers, setFollowers] = useState([]);
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);
    const [currentUserId, setCurrentUserId] = useState(auth?.currentUser?.uid);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [profileChange, setProfileChange] = useState(0);
    const [recipeChange, setRecipeChange] = useState(0);
    const [recipeInteractions, setRecipeInteractions] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [themeColors, setThemeColors] = useState(themes[loggedInUser?.theme] || themes.blue);

    useEffect(() => {
        const getUsers = async () => {
            let all = await getAllUsers();
            setUsers(all.sort((a, b) => b.memberSince - a.memberSince));
        }
        getUsers();

    }, [recipes, profileChange, recipeChange]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedStatus(auth?.currentUser);
                setCurrentUserId(auth?.currentUser?.uid);
                setLoggedInUser(users?.find(x => x.userId === currentUserId))
                setThemeColors(themes[loggedInUser?.theme] || themes.blue);
            } else {
                setThemeColors(themes.blue);
            }
        });
    }, [users, currentUserId, loggedInUser]);

    useEffect(() => {
        const getRecipesHandler = async () => {
            let all = await getAllRecipes();
            setRecipes(all.sort((a, b) => b.createdOn - a.createdOn));
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

    if (followers.length > 0 && users.length > 0 && recipes.length > 0) {
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


}

export default App;
