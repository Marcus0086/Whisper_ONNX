'use client';

import { useState } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";

import { useWhsiperSettings } from '@/context/whisperStore';
import LoadingIcon from './loadingIcon';

const MicButton = () => {
    const [micOn, setMicOn] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { settings: {
        model, processor, recorder
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
    return <div
        className='flex items-center justify-center p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
        {isProcessing ?
            <LoadingIcon />
            : micOn ?
                <button onClick={toggleMic}>
                    <CiMicrophoneOff className="h-16 w-16 text-red-500" />
                </button>
                : <button onClick={toggleMic}>
                    <CiMicrophoneOn className="h-16 w-16 text-green-500" />
                </button>}
    </div>
}

export default MicButton;
