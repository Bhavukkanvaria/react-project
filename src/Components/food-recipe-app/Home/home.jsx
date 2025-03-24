import { useContext } from "react"
import { SearchContext } from "../Context/useContext"
import { Link } from "react-router-dom"

export const RecipeItem = ({item})=>{

    return(
        <div className="flex flex-col w-80 overflow-hidden p-5 gap-5 border-2 border-white shadow-xl recipe-item">
            <div className="h-40 flex justify-center items-center overflow-hidden recipe-image">
                <img src={item.image_url} />
            </div>
            <span className="text-sm text-cyan-700 font-medium">{item.publisher}</span>
            <h3 className="font-bold text-2xl truncate text-balck">{item.title}</h3>
            <Link to={`/recipe-item/${item.id}`} 
            className="text-sm p-3 px-8 rounded-lg uppercase inline-block font-medium tracking-wider bg-black text-white">Recipe Details</Link>
        </div>
    )
}


export const Home = ()=>{
    const {recipes, loading} = useContext(SearchContext);

    if(loading){
        return (<div>Loading....</div>)
    }

    return(
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 food-home">
            {
                recipes?.length>0 &&
                recipes.map((item)=>{
                    return (<RecipeItem item={item} key={item.id}/>)
                })
            }
        </div>
    )
}