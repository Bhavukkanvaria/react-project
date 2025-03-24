import { useCallback, useEffect, useState } from "react"
import './style.css'

const ProductCard = ({product})=>{
    return(
        <div className={`product-card product-item-${product.id}`}>
            <img className="product-img" src={product.thumbnail} alt={product.title} />
            <span className="product-title">{product.title}</span>
        </div>  
    )
}

// Frontend Pagination, All data have been fetched and then we apply pagination

const PAGE_SIZE = 10;
export const PaginationComponent = ()=>{
    const [loadiong, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClick = (index) => {
        setCurrentPage(index);
    }

    const onPrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }
    const onNextClick = () => {
        const no_of_pages = Math.ceil(total_products / PAGE_SIZE);
        if (currentPage < no_of_pages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const fetchData = useCallback(async ()=>{
        setLoading(true);
        setError(null);
        try{
            // const response = await fetch(`https://dummyjson.com/products`);
            const response = await fetch(`https://dummyjson.com/products?limit=500`);
            const result = await response.json();
            if(result?.products){
                setData(result.products);
            }
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const total_products = data.length;
    const no_of_pages = Math.ceil(total_products / PAGE_SIZE);
    let start = (currentPage * PAGE_SIZE) - PAGE_SIZE;
    let end = (currentPage * PAGE_SIZE) || start + PAGE_SIZE;
    // const current_products = data.slice((currentPage*PAGE_SIZE)-PAGE_SIZE,currentPage*PAGE_SIZE)


    
    return (<div className="pagaintion-component-wrapper">
        <h1>Pagination</h1>
        {
            <div className="pagination-count">
                <button disabled={currentPage === 1} className="prev-page" onClick={onPrevClick}>PREV</button>
                {Array.from({ length: no_of_pages }).map((_, index) => {
                    return (
                        <div key={index} className={`page-no ${index + 1 === currentPage ? 'selected' : ''}`} onClick={() => onPageClick(index + 1)}>{index + 1}</div>
                    )
                })}
                <button disabled={currentPage === no_of_pages} className="next-page" onClick={onNextClick}>NEXT</button>
            </div>
        }
        <div className="pagination-container">

            {
                data.length > 0 ?
                data.slice(start, end).map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                    :
                    <div className="no-data">No Products</div>
            }
        </div>
    </div>)
}