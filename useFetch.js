import { useState, useEffect } from "react";

const localCache = {}

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() => {
        getFecth()

    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFecth = async () => {

        if (localCache[url]) {
            console.log('Usando caché')
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return
        }

        setLoadingState()


        const resp = await fetch(url)

        await new Promise(resolve => setTimeout(resolve, 1500))

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.statusText
            })
            return
        }

        const data = await resp.json()

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })

        //Manejo de caché
        localCache[url] = data

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}

