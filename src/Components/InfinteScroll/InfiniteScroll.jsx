import { useCallback, useEffect, useRef, useState } from "react"

import './style.css'

export const InfiniteScroll  = ()=>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count,setCount] = useState(0);
    const refContainer = useRef();
    const timer = useRef();
    const [hasMore, setHasMore] = useState(true); // Track if there's more data to load


    const fetchData = useCallback(async ()=>{
        let ignore = false;
        setLoading(true);
        setError(null);
        let url = `https://dummyjson.com/products?limit=20&skip=${count}`
        try{
            const response = await fetch(url);
            const result = await response.json();
            if(!ignore && result.products){
                if(result.products.length===0){
                    setHasMore(false); // No more data
                }else{
                    setHasMore(true);
                    setData((prev)=> [...prev, ...result.products])
                    // setData([...data, ...result.products])
                }
            }
        }catch(error){
            if(!ignore){
                setError(error.message)
            }
        }finally{
            if(!ignore){
                setLoading(false)
            }
        }

        return()=> {
            ignore = true;
        }

    },[count])

    useEffect(() => {
        fetchData();
    }, [fetchData, count])

    useEffect(() => {
        let container = refContainer.current;
        const handleScroll = (_e) => {
            let { scrollTop, clientHeight, scrollHeight } = container
            if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMore) {
                setCount((prev) => prev + 20)
            }
        }
        const debounceScroll = () => {
            if (timer.current) {    // first clear the timeout if it's already there 
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                handleScroll();
            }, 300)
        }
        container.addEventListener('scroll', debounceScroll)
        return () => {
            container.removeEventListener('scroll', debounceScroll)
            if (timer.current) {
                clearTimeout(timer.current); // Clear timer on unmount
            }
        }
    }, [hasMore])

    return(
        <div className="infinite-scroll-container">
            <h3>Infinite Scroll </h3>
        <div className="infinite-scroll-wrapper" ref={refContainer}>
            
            {
                data && data.map((product)=>{
                    return(
                        <div  key={product.id} className="product-wrapper">
                            <img className="prodcut-img"
                                src={product.thumbnail}
                            />
                            <div className="product-title">{product.title}</div>
                        </div>
                    )
                })
            }
            {loading && <div className="infinite-loading">Loading more data...</div>}
        </div>
        </div>
    )
}