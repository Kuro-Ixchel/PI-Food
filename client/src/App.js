import './App.css';
import axios from "axios"
import { useState } from "react"
import SearchBar from './Components/SearchBar/SearchBar';

function App() {

const [setRecipes, /*recipes*/] = useState([])
/*
  const onClose = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  };
*/
  const onSearch = async (id) => {
    try {
      const { data } = await axios(`https://api.spoonacular.com/recipes/${id}/information`)
      if (data.name) {
        setRecipes((oldRecipes) => [...oldRecipes, data]);
      }
    } catch (error) {
      alert('La receta ya se muestra en pantalla.');
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={onSearch} />
      
    </div>
  );
}

export default App;
