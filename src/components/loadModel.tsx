'use client';

import { useEffect, useState } from "react";

import LoadingIcon from "./loadingIcon";

import { useWhsiperSettings } from "@/context/whisperStore";

import { cn } from "@/utils/cn";


const LoadModel = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { settings: {
        isLoaded, model
    }, dispatch } = useWhsiperSettings()

    const handleLoadModel = () => {
        setIsLoading(true)
        dispatch({
            type: "GET_MODEL",
            payload: {}
        })
    }

    useEffect(() => {
        const loadModel = async () => {
            if (model) {
                await model.loadModel('/_next/static/chunks/model/whisper.onnx');
                dispatch({
                    type: "SET_LOADED",
                    payload: {
                        isLoaded: true
                    }
                })
                setIsLoading(false)
            }
        }
        loadModel()
    }, [dispatch, model])
    return <button
        className={cn(
            "flex items-center justify-center px-4 py-2",
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md",
            isLoading || isLoaded ? "cursor-not-allowed opacity-70" : "",
        )}
        onClick={handleLoadModel}
        disabled={isLoaded || isLoading}>
        {isLoading && <LoadingIcon />}
        Load Model
    </button>
}

export default LoadModel;