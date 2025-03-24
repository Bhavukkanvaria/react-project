import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { SearchContext } from "../Context/useContext"

export const Navbar = () => {

    const {query, setQuery, onSubmitHandler} = useContext(SearchContext)

    const onChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className="food-navbar flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
            <h2 className="text-2xl font-semibold">
                <NavLink
                    to={'/'}
                    className="text-black hover:text-gray "
                >
                    Food Recipe
                </NavLink>
            </h2>
            <form onSubmit={onSubmitHandler}>
                <input 
                name="search"
                placeholder="enter recipe"
                className="food-input bg-white/75 p-3 px-8 outline-none lg:w-96 shadow-lg"
                value={query}
                onChange={onChangeHandler}
                />
            </form>
            <ul className="flex gap-5 food-list">
                <li>
                    <NavLink
                        to={'/'}
                        className="text-black hover:text-gray "
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'/favourite'}
                        className="text-black hover:text-gray "
                    >
                        Favourite
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}