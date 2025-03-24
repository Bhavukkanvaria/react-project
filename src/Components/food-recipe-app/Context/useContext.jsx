import {  createContext, useState } from "react";

export const SearchContext = createContext();


export const ContextState = ({ children }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([])
    const [recipeDetails, setRecipeDetails] = useState();
    const [favourites, setFavourites] = useState([])

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
            const result = await response.json();
            if(result?.data?.recipes?.length){
                setRecipes(result.data.recipes)
            }
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <SearchContext.Provider value={{query,setQuery,onSubmitHandler, loading, recipes, recipeDetails, setRecipeDetails, favourites, setFavourites}}>
            {children}
        </SearchContext.Provider>
    )
}