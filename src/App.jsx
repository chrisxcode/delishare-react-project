import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { ListOfRecipes } from './components/ListOfRecipes';

function App() {

    const [recipes, setRecipes] = useState([]);

    const recipeCollectionRef = collection(db, "recipes");

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
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/recipes" element={<ListOfRecipes recipes={recipes} />} />
            </Routes>

        </div >
    );


}

export default App;
