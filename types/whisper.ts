import Whisper from "@/utils/whisper";

import { AudioProcessor, AudioRecorder } from ".";

interface WhisperSettings {
    model?: Whisper;
    text?: string;
    recorder?: AudioRecorder;
    processor?: AudioProcessor,
    isLoaded?: boolean;
}

interface WhisperStoreAction {
    type: "SET_TEXT" | 'GET_MODEL' | "SET_LOADED";
    payload: WhisperSettings;
}

export type {
    WhisperSettings,
    WhisperStoreAction
}