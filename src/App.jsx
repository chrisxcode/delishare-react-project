import './App.css';

import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"

import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from "./config/firebase"

import { signUp, logIn, logout } from "./REST/account";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Auth } from './components/Auth';
import { ListOfRecipes } from './components/ListOfRecipes';
import { AuthorRecipe } from './components/AuthorRecipe';
import { Profile } from './components/Profile';
import { DetailedRecipe } from './components/DetailedRecipe';
import { NotFound } from './components/NotFound';

function App() {

    // THEME
    const [themeColors, setThemeColors] = useState({ header: "#264653", body: "#2a9d8f" })

    // USER - Initialize state, which will hold user logged in status
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedStatus(auth?.currentUser);
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

    // RECIPES - Connect to Firebase collection for recipes
    const recipeCollectionRef = collection(db, "recipes");

    // RECIPES - Fetch recipes and store them in state (only on first load)
    const getRecipes = async () => {
        try {
            const data = await getDocs(recipeCollectionRef);
            const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setRecipes(filteredData);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getRecipes();
    }, [])

    return (
        <div className="App">

            <Header themeColors={themeColors} loggedStatus={loggedStatus} />

            <div id='body' style={{ backgroundColor: themeColors.body }}>

                <Routes>
                    <Route path="/auth" element={<Auth
                        setLoggedStatus={setLoggedStatus}
                        signUp={signUp}
                        logIn={logIn}
                        loggedStatus={loggedStatus} />} />
                    <Route path="/recipes" element={<ListOfRecipes recipes={recipes} themeColors={themeColors} />} />
                    <Route path="/recipes/:recipeId" element={<DetailedRecipe recipes={recipes} setRecipes={setRecipes} />} />
                    <Route path="/recipes/:recipeId/edit" element={<AuthorRecipe setRecipes={setRecipes} recipes={recipes} />} />
                    <Route path="/create" element={<AuthorRecipe setRecipes={setRecipes} recipes={recipes} />} />
                    <Route path="/profile" element={<Profile
                        setLoggedStatus={setLoggedStatus}
                        logout={logout} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" exact element={<Home />} />
                </Routes>

            </div>



        </div >
    );




}

export default App;
