import { useCallback, useEffect, useState } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import './style.css'


const useFetchHook = (url, fetchonMount = false ) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refetchCount, setRefetchCount] = useState(0)

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!ignore && result) {
                    setData(result)
                }
            } catch (error) {
                if (!ignore) {
                    setError(error.message)
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }
        if (fetchonMount || refetchCount > 0) {
            fetchData()
        }

        return () => {
            ignore = true;
        }

    }, [url, fetchonMount, refetchCount])

    const refetch = () => {
        setRefetchCount((prev) => prev + 1)
    }

    return {
        data,
        loading,
        error,
        refetch
    }
}

const ImageSlider = ({ url, limit = 10 }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const {data:images,loading,error} = useFetchHook(url+`?limit=${limit}`,true);

    const handleNextClick = () => {
        let imageId = currentImage === images.length-1 ? 0 : currentImage + 1
        setCurrentImage(imageId)
    }
    const handlePrevClick = () => {
        let imageId = currentImage === 0 ? images.length-1 : currentImage - 1
        setCurrentImage(imageId)
    }

    if(loading){
        return <div>Loading Images...</div>
    }

    if(error!=null){
        return <div>Error occured {error}</div>
    }

    return (
        <div className="image-container">
            <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handlePrevClick}/>
            {
                images && images.map((image,index)=>{
                    return(
                        <img 
                        key = {image.id}
                        src={image.download_url} 
                        className={currentImage === index ? 'current-image':'current-image hide'}
                        />
                    )
                })
            }
            <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleNextClick}/>
            <span className="circle-indicator">
                {
                    images && images.map((_,index)=>{
                        return(
                            <div key={index} className={
                                currentImage === index ? 'active current-indicator' :'current-indicator'
                                }
                                onClick={() => setCurrentImage(index)}
                            ></div>
                        )
                    })
                }
            </span>
        </div>
    )
}

export default ImageSlider