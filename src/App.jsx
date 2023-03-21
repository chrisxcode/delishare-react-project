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

function App() {

    // USER - Create state, which will hold user logged in status
    const [loggedStatus, setLoggedStatus] = useState(auth?.currentUser);

    // USER - Redirect to Home page when user logs in/out
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [loggedStatus]);

    // RECIPES - Connect to Firebase collection for recipes
    const recipeCollectionRef = collection(db, "recipes");

    // RECIPES - Create state for recipe collection
    const [recipes, setRecipes] = useState([]);

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
            <Header
                loggedStatus={loggedStatus}
                setLoggedStatus={setLoggedStatus}
                signUp={signUp}
                logIn={logIn}
                logout={logout} />
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/auth" element={<Auth
                    setLoggedStatus={setLoggedStatus}
                    signUp={signUp}
                    logIn={logIn}
                    loggedStatus={loggedStatus} />} />

                <Route path="/recipes" element={<ListOfRecipes recipes={recipes} />} />

            </Routes>

        </div >
    );


}

export default App;
