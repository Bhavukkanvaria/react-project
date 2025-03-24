import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SearchContext } from "../Context/useContext";

export const Details = () => {

    const { recipeDetails, setRecipeDetails, favourites, setFavourites } = useContext(SearchContext);
    const [loading, setLoading] = useState(false)
    const params = useParams();

    const fetchDetails = (async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`);
            const result = await response.json();
            if (result?.data?.recipe) {
                setRecipeDetails(result.data.recipe)
            }
        } catch (error) {
            // setError(error.message)
        } finally {
            setLoading(false)
        }
    })

    const handleFavourite = (item) => {
        let index = favourites.findIndex((fav) => fav.id === item.id);
        if (index === -1) {
            setFavourites([...favourites, { ...item }])
        } else {
            const data = favourites.filter((fav)=> fav.id!=item.id)
            setFavourites(data);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 gap-10">
            <div className="row-start-2 lg:row-start-auto">
                <div className="height-100 overflow-hidden ">
                    <img
                        src={recipeDetails?.image_url}
                    />
                    <div className="flex flex-col gap-3">
                        <span className="text-sm text-cyan-700 font-medium">{recipeDetails?.publisher}</span>
                        <h3 className="font-bold text-2xl truncate text-balck">{recipeDetails?.title}</h3>
                        <div>
                            <button 
                            className="p-3 px-8 text-sm font-medium mt-3 inline-block"
                            onClick={()=>handleFavourite(recipeDetails)}>
                                {favourites.findIndex((favourite)=> favourite.id=== params.id)== -1 ?
                                'Save as favourites':
                                'Remove as favourites'}
                            </button>
                        </div>
                        <div className="">
                            <span className="text-2xl">Ingredients</span>
                            <ul className="flex flex-col gap-3">
                                {
                                    recipeDetails?.ingredients.map((item)=>{
                                        return(
                                            <li>
                                                <span>{item.quantity} {item.unit}</span>
                                                <span>{item.description}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}