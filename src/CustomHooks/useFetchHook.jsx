import { useCallback, useEffect, useState } from "react"


export const useFetchHook = (url, fetchOnMount = false) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refetchCount, setRefetchCount] = useState(0);

    useEffect(() => {
        let igonre = false;

        const fetchdata = async () => {
            setLoading(true);
            setError(null); // Reset error before each fetch
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!igonre && result) {
                    setData(result)
                }
            } catch (error) {
                if (!igonre) {
                    setError(error.message)
                }
            } finally {
                if (!igonre) {
                    setLoading(false)
                }
            }
        }

        if (fetchOnMount || refetchCount > 0) {
            fetchdata()
        }

        return () => {
            igonre = true;
        }

    }, [url, fetchOnMount, refetchCount])

    const refetch = () => {
        setRefetchCount((prev) => prev + 1);
    }
    return {
        data,
        loading,
        error,
        refetch
    }

}

// fetch hook without creating refetch function but has refetch functinality

export const useFetchHook2 = (url, fetchOnMount = false) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async ()=>{
        let ignore = false;

        setLoading(true);
        setError(null); // Reset error before each fetch
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (!ignore && result) {
                setData(result)
            }
        } catch (error) {
            if(!ignore){
                setError(error.message)
            }
        } finally {
            if(!ignore){
                setLoading(false)
            }
        }

        return () => {
            ignore = true;
        }

    },[url])

    useEffect(() => {
        if (fetchOnMount) {
            fetchData()
        }
    }, [fetchOnMount, fetchData])

    return {
        data,
        loading,
        error,
        fetchData
    }
}

// fetch hook without ignore and use AbortController
export const useFetchHook3 = (url, fetchOnMount = false) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async ()=>{
        const abortController = new AbortController(); // Create an AbortController
        setLoading(true);
        setError(null); // Reset error before each fetch
        try {
            const response = await fetch(url,{signal: abortController.signal});
            const result = await response.json();
            if (result) {
                setData(result)
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }

        return () => abortController.abort(); // Cleanup function to abort the request

    },[url])

    useEffect(() => {
        if (fetchOnMount) {
            fetchData()
        }
    }, [fetchOnMount, fetchData])

    return {
        data,
        loading,
        error,
        fetchData
    }
}

// usage of manual fetch data on click
export const FetchDataOnClick = () => {
    const { data, loading, error, fetchData } = useFetchHook2(
        "https://dummyjson.com/users?limit=10",
        false // Set fetchOnMount to false
    );

    const handleClick = () => {
        fetchData(); // Manually trigger the API call
    };

    return (
        <div>
            <h1>Fetch Data on Button Click</h1>
            <button onClick={handleClick} disabled={loading}>
                {loading ? "Loading..." : "Fetch Data"}
            </button>

            {error && <div className="error">Error: {error}</div>}

            {data && (
                <div>
                    <h2>Data:</h2>
                    {
                        data.users.map((item) => {
                            return (
                                <div>
                                    <span>{item.firstName}</span>
                                    <span>{item.lastName}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
};