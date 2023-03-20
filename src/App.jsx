import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { ListOfRecipes } from './components/ListOfRecipes';

function App() {

    const [recipes, setRecipes] = useState([]);

    const moviesCollectionRef = collection(db, "recipes");

    const getRecipes = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setRecipes(filteredData);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getRecipes();
    },)

    return (
        <div className="App">
            <Auth />

            <ListOfRecipes recipes={recipes} />
        </div>
    );


}

export default App;
