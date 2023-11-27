'use client';

import React, {
    Dispatch, createContext,
    useContext, useReducer
} from "react";

import Whisper from "@/utils/whisper";
import audioProcessor from "@/utils/audio_processor";
import audioRecorder from "@/utils/recoder";

import {
    WhisperSettings, WhisperStoreAction
} from "@/types";


const DEFAULT_STATE: WhisperSettings = {
    text: "",
    processor: audioProcessor,
    recorder: audioRecorder,
    model: undefined,
    isLoaded: false,
}

const WhisperStore = createContext({
    settings: DEFAULT_STATE,
    dispatch: (() => { }) as Dispatch<WhisperStoreAction>
})

export const useWhsiperSettings = () => useContext(WhisperStore)

const whisperStoreReducer = (state: WhisperSettings, action: WhisperStoreAction) => {
    switch (action.type) {
        case "GET_MODEL":
            const model = new Whisper();
            return { ...state, model }
        case "SET_TEXT":
            return { ...state, text: action.payload.text }
        case "SET_LOADED":
            return { ...state, isLoaded: action.payload.isLoaded }
        default:
            return state;
    }
}

const WhisperStoreProvider = ({ children }:
    { children: React.ReactNode, }) => {

    const [settings, dispatch] = useReducer(whisperStoreReducer, DEFAULT_STATE)

    return <WhisperStore.Provider value={{ settings, dispatch }}>
        {children}
    </WhisperStore.Provider>
}

export default WhisperStoreProvider;