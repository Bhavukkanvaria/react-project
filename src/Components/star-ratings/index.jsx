import { useState } from "react";
import './style.css'


const StarRating = ({ numStars = 5 }) => {
    // let array = [...Array(numStars)];
    let array = Array.from({ length: numStars });
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleStarClick = (currentIndex) => {
        setRating(currentIndex + 1)
    }

    const handleMouseEnter = (currentIndex) => {
        setHover(currentIndex + 1)
    }

    const handleMouseLeave = () => {
        setHover(0)
    }
    return (
        <div className="star-rating">
            <h3>Star Rating</h3>
            {
                array.map((_star, index) => {
                    return (<span
                        key={index}
                        style={{
                            cursor: 'pointer',
                            //   color: (rating > index) || (hover>index)? '#ffc107' : '#e4e5e9',
                            color: (hover || rating) > index ? '#ffc107' : '#e4e5e9', // use this if you want to update rating on hover
                            fontSize: '24px',
                        }}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        ★
                    </span>)
                })
            }
        </div>
    )
}

export default StarRating;