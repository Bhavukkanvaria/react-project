import { useEffect, useRef, useState } from "react";

const randomUtitlity = (length) => {
    return Math.floor(Math.random() * length)
}

const RandomColor = ()=>{

    const [color, setColor] = useState('#ffffff');
    const [typeColor, setTypeColor] = useState('hex');
    const isFirstRender = useRef(true); // Ref to track initial render

    const generateRandomColor = () => {
        if(typeColor === 'hex'){
            let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
            let hexColor = '#'
            for (let i = 0; i < 6; i++) {
                hexColor += hex[randomUtitlity(hex.length)]
            }
            setColor(hexColor);
        }else if(typeColor === 'rgb'){
            const r = randomUtitlity(256);
            const g = randomUtitlity(256);
            const b = randomUtitlity(256);
            setColor(`rgb(${r},${g},${b})`)
        }
    }

    // Alternative for creating hex color
    const generateRandomColor2 = () => {
        if (typeColor === 'hex') {
            let hexColor = '#' + Array.from({ length: 6 }).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            setColor(hexColor)
        }else if(typeColor === 'rgb'){
            const r = randomUtitlity(256);
            const g = randomUtitlity(256);
            const b = randomUtitlity(256);
            setColor(`rgb(${r},${g},${b})`)
        }
    }

    // This useEffect run twice initially, because of React 18's Strict Mode behavior.
    /*
    In React 18's Strict Mode:
        Components are mounted, unmounted, and remounted during the initial render in development mode.
        This means useEffect will run twice: once for the initial mount and once for the remount.
        This behavior is only in development mode and does not happen in production.
    */
    useEffect(() => {
        // if(isFirstRender.current){
        //     isFirstRender.current=false;
        //     return
        // } 
        generateRandomColor2()
    }, [typeColor])
    

    return (
        <div className="random-color-wrapper">
            <button onClick={() => setTypeColor('hex')}>Create Hex Color</button>
            <button onClick={() => setTypeColor('rgb')}>Create RGB Color</button>
            {/* <button onClick={generateRandomColor}>Generate Random Color</button> */}
            <button onClick={generateRandomColor2}>Generate Random Color</button>
            <div style={{ width: "100%", background: color }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '20px',
                    marginTop: '50px',
                    gap: '20px'
                }}>
                    <h3>{typeColor === 'rgb' ? 'RGB Color' : 'Hex Color'}</h3>
                    <h1>{color}</h1>
                </div>
            </div>
        </div>
    )
}

export default RandomColor