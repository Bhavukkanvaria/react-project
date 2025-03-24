import { useEffect, useState } from "react"

import './style.css'

const useFetchData = (url,fetchonMount=false)=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const ignore = false
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const response = await fetch(url)
                const result = await response.json();
                if(!ignore && result){
                    setData(result.products)
                }
            } catch (error) {
                if(!ignore){
                    setError(error.message)
                }
            }finally{
                if(!ignore){
                    setLoading(false)
                }
            }
        }

        if(fetchonMount){
            fetchData()
        }

    },[url,fetchonMount])

    return{
        data,
        loading,
        error
    }
}

const ScrollIndicator = () => {

    const { data, loading, error } = useFetchData(`https://dummyjson.com/products?limit=100`, true)
    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            let scrollTop = document.documentElement.scrollTop
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            let height = scrollHeight - clientHeight;
            let scrollPercent = (scrollTop / height) * 100;
            setScrollPercentage(scrollPercent);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (loading) {
        return (<div>Loading data....</div>)
    }

    if (error != null) {
        return <div>Error occured {error}</div>
    }

    return (
        <div className="scroll-container">
            <div className="scroll-wrapper">
                <div>Custom scrollbar</div>
                <div className="scroll-indicator">
                    <div className="scroll-progress" style={{ width: `${scrollPercentage}%` }}></div>
                </div>
            </div>
            <div className="data-container">
                {
                    data && data.map((item, index) => {
                        return (
                            <div key={index}>{item.title}</div>
                        )
                    })
                }
            </div>
            {/* </div> */}
        </div>
    )

}

export default ScrollIndicator