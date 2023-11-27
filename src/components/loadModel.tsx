'use client';

import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";

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

    const { button_disabled, button_text, ask_copy } = {
        button_text: isLoaded ? "Model Loaded" : "Load Model",
        button_disabled: isLoaded || isLoading,
        ask_copy: !isLoaded
            ? "Click on `Load Model` to get started"
            : "Click the mic to record your voice",
    }

    useEffect(() => {
        const loadModel = async () => {
            if (model) {
                await model.loadModel('https://github.com/Marcus0086/whisper_model/blob/a129f6345421b1bb7ee859b1aba60c9af22953d0/model/whisper_base.onnx');
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
    return <>
        <h3 className="text-[10px] leading-[12px] text-gray-400">{ask_copy}</h3>
        <button
            className={cn(
                "transition-all duration-150 ease-in-out",
                "flex items-center justify-center px-4 py-2 font-normal gap-x-1",
                "text-white py-2 px-4 rounded-md text-sm",
                !isLoaded ? "bg-gradient-to-tr from-[#3684cf] to-[#835fdf]" : "",
                isLoaded ? "bg-[#4cc035]" : "",
                isLoading || isLoaded ? "cursor-not-allowed" : ""
            )}
            onClick={handleLoadModel}
            disabled={button_disabled}>
            {isLoading && <LoadingIcon />}
            {isLoaded && <MdDone className="h-5 w-5" />}
            {button_text}
        </button>
    </>
}

export default LoadModel;