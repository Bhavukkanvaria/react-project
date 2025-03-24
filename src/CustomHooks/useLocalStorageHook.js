import { useEffect, useState } from "react"


export const useLocalStorageHook = (key, defaultValue) => {

    const savedData = localStorage.getItem(key) || defaultValue;

    const [value, setValue] = useState(JSON.parse(savedData));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return {
        value,
        setValue
    }
}