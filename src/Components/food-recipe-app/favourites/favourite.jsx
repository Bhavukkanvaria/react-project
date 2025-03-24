import { useContext } from "react";
import { RecipeItem } from "../Home/home";
import { SearchContext } from "../Context/useContext";

export const Favourite = () => {
    const { favourites } = useContext(SearchContext);

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {
                favourites?.length > 0 &&
                favourites.map((item) => {
                    return (<RecipeItem item={item} key={item.id} />)
                })
            }
        </div>
    )
}
