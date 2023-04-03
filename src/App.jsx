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

// CONTEXT
export const AppContext = createContext(null);

function App() {

    // THEME
    const [themeColors, setThemeColors] = useState({ header: "#264653", body: "#2a9d8f" })

    // USER - Initialize states, which will hold user logged in status and Id
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);
    const [currentUserId, setCurrentUserId] = useState(auth?.currentUser?.uid)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedStatus(auth?.currentUser);
                setCurrentUserId(auth?.currentUser?.uid)
            }
        });
    }, []);


    // USER - Redirect to Home page when user logs in/out
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [loggedStatus]);

    // RECIPES - Create state for recipe collection
    const [recipes, setRecipes] = useState([]);

    // RECIPES - Fetch recipe data and save it in the recipe state

    useEffect(() => {
        const getRecipesHandler = async () => {
            let all = await getAllRecipes();
            setRecipes(all);
        }
        getRecipesHandler();
    }, []);

    // RECIPE INTERACTIONS - Create state for recipe interactions

    const [recipeInteractions, setRecipeInteractions] = useState([]);

    // RECIPE INTERACTIONS - Fetch recipe interaction data and save it in the recipe interactions state

    useEffect(() => {
        const getRecipeInteractions = async () => {
            let all = await getAllRecipeInteractions();
            setRecipeInteractions(all);
        }
        getRecipeInteractions();
    }, []);

    // USERS & FOLLOWERS - Set state to register when a profile information has been changed

    const [profileChange, setProfileChange] = useState(0);

    // ALL USERS - Create state for all users

    const [users, setUsers] = useState([]);

    // ALL USERS - Fetch all users data and save it in the users state

    useEffect(() => {
        const getUsers = async () => {
            let all = await getAllUsers();
            setUsers(all);
        }
        getUsers();
    }, [recipes, profileChange]);

    // FOLLOWERS - Create state for all followers

    const [followers, setFollowers] = useState([]);

    // FOLLOWERS - Fetch all followers data and save it in the followers state

    useEffect(() => {
        const getFollowers = async () => {
            let all = await getAllFollowers();
            setFollowers(all);
        }
        getFollowers();
    }, [profileChange]);

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
            <div className="App">

                <Header userId={auth?.currentUser?.uid} />

                <div id='body' style={{ backgroundColor: themeColors.body }}>

                    <Routes>
                        <Route path="/login" element={<Login logIn={logIn} />} />
                        <Route path="/register" element={<Register signUp={signUp} setUsers={setUsers} />} />
                        <Route path="/recipes" element={<ListOfRecipes />} />
                        <Route path="/recipes/:recipeId" element={<DetailedRecipe />} />
                        <Route path="/recipes/:recipeId/edit" element={<AuthorRecipe />} />
                        <Route path="/create" element={<AuthorRecipe />} />
                        <Route path="/profile/:userId/*" element={<Profile
                            followers={followers}
                            setProfileChange={setProfileChange}
                            logout={logout} />} />
                        <Route path="/users" element={<Users followers={followers} />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" exact element={<Home />} />
                    </Routes>

                </div>



            </div >
        </AppContext.Provider>
    );




}

export default App;
