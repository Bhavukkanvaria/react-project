import { useEffect, useRef, useState } from "react"
import './style.css'

const LoadMoreData = ()=>{

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count,setCount] = useState(0);
    const lastProductRef = useRef(null)

    const fetchProducts = async () => {
        setLoading(true);
        let url = `https://dummyjson.com/products?limit=20&skip=${count}`
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result) {
                setProducts([...products, ...result.products])
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [count])

    useEffect(()=>{
        if(lastProductRef?.current){
            lastProductRef.current.scrollIntoView({behaviour:'smooth'})
        }
    },[products])

    const handleLoadMore = () => {
        setCount((prevcount) => prevcount + 20)
    }

    const disableLoadMore = products?.length>=100 ? true:false 

    return(
        <div className="load-more-wrapper">
            <div className="data-wrapper">
                {
                    products && products.map((product,index)=>{
                        return(
                            <div className="product-image-container" key={product.id} ref={lastProductRef}>
                                <img
                                    src= {product.thumbnail}
                                    height={'100%'}
                                    width={'100%'}
                                />
                                <div className="data-title">{product.title}</div>
                            </div>
                        )
                    })
                }
            </div>
            {loading && <div>Loading more data...</div>}
            {error && <div>Error occurred: {error}</div>}
            <button disabled={disableLoadMore} onClick={handleLoadMore}>Load more</button>
        </div>
    )
}

export default LoadMoreData