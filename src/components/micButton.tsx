'use client';

import { useState } from 'react';
import { PiMicrophoneSlash, PiMicrophone } from "react-icons/pi";

import { useWhsiperSettings } from '@/context/whisperStore';
import LoadingIcon from './loadingIcon';
import { cn } from '@/utils/cn';

const MicButton = () => {
    const [micOn, setMicOn] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { settings: {
        model, processor, recorder, isLoaded
    }, dispatch } = useWhsiperSettings();

    const handleAudioRecording = async () => {
        setMicOn(true);
        await recorder?.start();
    }

    const handleAudioStop = async () => {
        const audio = await recorder?.stop();
        setIsProcessing(true);
        if (audio && model) {
            const text = await processor?.transcribe(audio, model);
            if (text) {
                dispatch({
                    type: "SET_TEXT", payload: {
                        text: text,
                    }
                });
            }
        }
        setMicOn(false);
        setIsProcessing(false);
    }

    const toggleMic = () => {
        if (micOn) {
            handleAudioStop();
        } else {
            handleAudioRecording();
        }
    }
    return <>
        <div className='relative'>
            <div
                className={cn(
                    "transition-all duration-150 ease-in-out",
                    "flex items-center justify-center p-2 rounded-full",
                    !isLoaded ? "bg-gray-500"
                        : "bg-gradient-to-tr from-[#3684cf] to-[#835fdf] pulse_ring"
                )}>
                {isProcessing ?
                    <h3 className='text-[10px] leading-3'>Processing ...</h3>
                    : !micOn ? <button
                        disabled={!isLoaded ? true : false}
                        onClick={toggleMic}>
                        <PiMicrophone className={cn(
                            "h-8 w-8",
                            !isLoaded ? "cursor-not-allowed" : "",
                        )} />
                    </button> :
                        <button
                            disabled={!isLoaded ? true : false}
                            onClick={toggleMic}>
                            <PiMicrophoneSlash className={cn(
                                "h-8 w-8",
                                !isLoaded ? "cursor-not-allowed" : ""
                            )} />
                        </button>
                }
            </div>
        </div>
        {micOn && !isProcessing && <h3 className='text-[10px] leading-3'>Listening ...</h3>}
    </>
}

export default MicButton;
