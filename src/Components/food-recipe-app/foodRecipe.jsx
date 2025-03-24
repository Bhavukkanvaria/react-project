import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Home/home";
import { Favourite } from "./favourites/favourite";
import { Details } from "./details/details";
import { ContextState } from "./Context/useContext";
import './style.css'

const FoodRecipe = () => {

    return (
        <ContextState>
            <div className="food-recipe-wrapper">
                <div className="min-screen-h p-6 bg-white text-gray-600 text-lg food-recipe-container">
                    <Navbar />
                    <Routes>
                        <Route
                            path={'/'}
                            element={<Home />}
                        ></Route>
                        <Route
                            path={'/favourite'}
                            element={<Favourite />}
                        ></Route>
                        <Route
                            path={'/recipe-item/:id'}
                            element={<Details />}
                        ></Route>
                    </Routes>
                </div>
            </div>
        </ContextState>
    )
}

export default FoodRecipe;