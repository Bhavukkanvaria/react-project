import { createContext, useState, useEffect, useCallback } from "react";
import { dummyData } from "./data";

export const FeatureFlagsContext = createContext(null);

const fetchData = () => {
    return new Promise((resolve, reject) => {
        if (dummyData) {
            setTimeout(() => {
                resolve(dummyData);
            }, 1000)
        } else {
            reject('No data available')
        }
    })
}

export const FeatureFlagsProvider = ({ children }) => {
    const [featureFlagsData, setFeatureFlagsData] = useState([])
    const [loading, setLoading] = useState(false);
    const fetchFeatureFlags = useCallback(async () => {
        setLoading(true);
        const response = await fetchData();
        if (response) {
            setFeatureFlagsData(response);
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        fetchFeatureFlags()
    }, [])

    return (
        <FeatureFlagsContext.Provider value={{ loading, featureFlagsData, setFeatureFlagsData }}>
            {children}
        </FeatureFlagsContext.Provider>
    )
}