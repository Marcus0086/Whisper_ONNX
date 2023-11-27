import Whisper from "@/utils/whisper"

interface AudioRecorder {
    audioBlob: Blob | null,
    mediaRecorder: MediaRecorder | null,
    audioStream: MediaStream | null,
    start: () => Promise<void>,
    stopStream: () => void,
    resetRecording: () => void,
    stop: () => Promise<Blob | undefined>
}

interface AudioProcessor {
    kSampleRate: number,
    kIntervalAudio_ms: number,
    kSteps: number,
    kDelay: number,
    sleep: (ms: number) => Promise<void>,
    processAudio: (audio: Float32Array, startTime: number, index: number, position: number, whisper: Whisper) => Promise<string>,
    transcribe: (audio: Blob, whisper: Whisper) => Promise<string>

}

export type {
    AudioRecorder,
    AudioProcessor
}