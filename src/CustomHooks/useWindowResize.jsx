import { useEffect, useLayoutEffect, useRef, useState } from "react"

export const useWindowResize = () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });
    const timer = useRef(null)

    // useEffect(()=>{
    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        // window.addEventListener('resize', handleResize);
        const throttleResize = ()=>{
            if(timer.current){
                return
            }
            timer.current = setTimeout(()=>{
                handleResize();
                timer.current = null;
            },300)
        }
        window.addEventListener('resize', throttleResize);
        handleResize()

        // return () => window.removeEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', throttleResize)
    }, [])

    return windowSize
}


export const WindowResize = () => {
    const { width, height } = useWindowResize();

    return (
        <div>
            <h1>Use window resize</h1>
            <div> Width is {width}</div>
            <div> Height is {height}</div>
        </div>
    )
}