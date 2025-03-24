import { useCallback, useEffect, useRef, useState } from "react"
import './style.css'


const SearchAutoComplete1 = () => {
    const [value, setValue] = useState('');
    const [loading, setloading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [filteredUser, setFilteredUser] = useState([])

    const onChange = (e) => {
        let val = e.target.value;
        setValue(val);
        if (val.length > 1) {
            const filterUsers = users.filter((user) => {
                return user.toLowerCase().indexOf(val.toLowerCase()) > -1
            })
            setFilteredUser(filterUsers)
            setShowDropDown(true)
        } else {
            setShowDropDown(false);
            setFilteredUser([])
        }
    }

    const fetchUserData = useCallback(async () => {
        setloading(true);
        try {
            const response = await fetch(`https://dummyjson.com/users`);
            const result = await response.json();
            if (result?.users) {
                let usernames = result.users.map((user) => user.firstName)
                setUsers(usernames)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setloading(false)
        }
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleSelect = (_event, user) => {
        setValue(user);
        setShowDropDown(false);
        setFilteredUser([])
    }

    if(loading){
        return(<div className="search-autocomplete-container-1">Loading ....</div>)
    }

    return (
        <div className="search-autocomplete-container-1">
            <div className="search-header">
                <div className="header-title">Here we have already fetch all usernames , and will filter
                    as soon as the user type something in the input box. </div>
            </div>
            <div className="search-autocomplete">
                <div className="input-wrapper">
                    <input
                        value={value}
                        onChange={(e) => onChange(e)}
                        placeholder="Search names"
                    />
                </div>
                <div className="userName-wrapper">
                    {
                        showDropDown && filteredUser &&
                        filteredUser.map((user, index) => {
                            return (
                                <div className="username"
                                    key={`${user}_${index}`}
                                    onClick={(event) => handleSelect(event, user)}>
                                    {user}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

/*
This autocomeplete search(Hit API) as the user type some input 
*/
const SearchAutoComplete2 = () => {
    const [value, setValue] = useState('');
    const [loading, setloading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const fetchUserData = useCallback(async () => {
        setloading(true);
        try {
            const response = await fetch(`https://dummyjson.com/users/search?q=${value}`);
            const result = await response.json();
            if (result?.users) {
                let usernames = result.users.map((user) => `${user.firstName} ${user.lastName}`)
                setUsers(usernames)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setloading(false)
        }
    }, [value])

    const onChange = (e) => {
        let val = e.target.value;
        setValue(val);
        setIsSelected(false)
        if(val.length<=1){
            setUsers([])
        }
    }

    const handleSelect = (_event,user)=>{
        setValue(user);
        setUsers([])
        setIsSelected(true); // Mark that a user has been selected
    }

    useEffect(() => {
        if(isSelected) return; 
        const timer = setTimeout(() => {
            if (value.length > 1) {
                fetchUserData()
            }
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [value])

    const filterUsers = users.filter((user) => {
        return user.toLowerCase().indexOf(value.toLowerCase()) > -1
    })

    const highlightMatch = (text, query) => {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;
    
        return (
            <>
                {text.substring(0, index)}
                <span style={{ fontWeight: 'bold', color: 'blue' }}>
                    {text.substring(index, index + query.length)}
                </span>
                {text.substring(index + query.length)}
            </>
        );
    };

    return (
        <div className="search-autocomplete-container-2">
            <div className="search-header">
                <div className="header-title">Here the usersnames will be search by the API,
                    as soon as the user type something in the input box, each time a API will hit with query equal to input value. </div>
            </div>
            <div className="search-autocomplete">
                <div className="input-wrapper">
                    <input
                        value={value}
                        onChange={(e) => onChange(e)}
                        placeholder="Search in firstName and lastName"
                    />
                </div>
                {loading && <div>Loading ....</div>}
                <div className="userName-wrapper">
                    {
                        filterUsers &&
                        filterUsers.map((user, index) => {
                            return (
                                <div className="username"
                                    key={`${user}_${index}`}
                                    onClick={(event) => handleSelect(event, user)}>
                                    {/* {user} */}
                                    {highlightMatch(user, value)}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )


}

const SearchAutoComplete3 = ()=>{
    const [query, setQuery] = useState('');
    const [data , setData] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [cache, setCache] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

    const dropdownRef = useRef(null)

    const onChangeHandler = (e)=>{
        let value = e.target.value
        setQuery(value);
        setIsSelected(false);
        setSelectedItemIndex(-1);
        if(value.length){
            setShowDropDown(true);
        }else{
            setShowDropDown(false);
        }
    } 

    const handleSelect = (name)=>{
        setQuery(name);
        setIsSelected(true);
        setShowDropDown(false);
    }

    const onFocus = () => {
        setShowDropDown(true);
        setData([]); // Clear old results when focusing on the input
    }

    const onBlur = () => {
        // Delay hiding the dropdown to allow item selection
        setTimeout(() => {
            setShowDropDown(false);
        }, 100)
    }

    const handleKeyDown = (e) => {
        let key = e.key;
        if (key === 'ArrowDown') {
            if (selectedItemIndex === data.length - 1) {
                setSelectedItemIndex(0)
            } else {
                setSelectedItemIndex((prev) => prev + 1);
            }
        } else if (key === 'ArrowUp') {
            if (selectedItemIndex <= 0) {
                setSelectedItemIndex(data.length - 1);
            } else {
                setSelectedItemIndex((prev) => prev - 1);
            }
        } else if (key === 'Enter') {
            let name = data[selectedItemIndex]?.name;
            handleSelect(name);
        }
        return;
    }

    const fetchRecipeData = useCallback(async ()=>{

        if(cache[query]){
            setData(cache[query]);
            return;
        }

        let ignore = false;
        setloading(true);
        setError(null);
        try {
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${query.trim()}`);
            const result = await response.json();
            if(result && !ignore){
                setData(result.recipes);
                setCache((prev)=> ({...prev, [query]: result.recipes}))
            }
        } catch (error) {
            if(!ignore){
                setError(error.message)
            }
        }finally{
            if(!ignore){
                setloading(false)
            }
        }

        return () => {
            ignore = true;
        }
    },[query])

    useEffect(() => {
        if(isSelected){
            return;
        }
        const timer = setTimeout(() => {
            if(query.length){
                fetchRecipeData();
            }
        }, 400)

        return () => {
            clearTimeout(timer);
        }
    }, [query, isSelected, fetchRecipeData])

    
    // Scroll the highlighted item into view
    useEffect(() => {
        if (selectedItemIndex >= 0 && dropdownRef.current) {
            const highlightedItem = dropdownRef.current.querySelector(
                `.dropdown-wrapper:nth-child(${selectedItemIndex + 1})`
            );
            if (highlightedItem) {
                highlightedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [selectedItemIndex]);

    const highlightMatch = (name)=>{
        const index = name.toLowerCase().indexOf(query.toLowerCase());
        if(index ===-1){
            return name;
        }

        return(
            <>
                {name.substring(0,index)}
                <span style={{fontWeight:'bold',color:'#3d7fba'}}>{name.substring(index, index+query.length)}</span>
                {name.substring(index+query.length)}
            </>
        )
    }

    return(
        <div className="search-autocomplete-container-3" ref={dropdownRef}>
            <h4>Search AutoComplete with API fetch on query</h4>
            <div>
                <input 
                type="text" 
                value={query}
                onChange={(e)=>{onChangeHandler(e)}}
                onFocus={()=>onFocus()}
                onBlur={()=>onBlur()} 
                placeholder="Search Recipes"
                onKeyDown={(e)=> handleKeyDown(e)}
                />
            </div>
            {
                showDropDown && data && data.length>0 && 
                <div className="search-dropdown">
                    {
                        data.map((item,index)=>{
                            return(
                                <div className={`dropdown-wrapper ${index === selectedItemIndex ? 'selected' : ''}`} key={item.id} onClick={()=>handleSelect(item.name)}>
                                    {highlightMatch(item.name)}
                                </div>
                            )
                        })
                    }
                </div>
            }
            
        </div>
    )
}

const SearchAutoComplete = () => {
    return (
        <div className="">
            <h3>Search Autocomplete</h3>
        <div className="search-autocomplete-wrapper">
            <SearchAutoComplete1 />
            <SearchAutoComplete2 />
            <SearchAutoComplete3 />
        </div>
        </div>
    )
}

export default SearchAutoComplete