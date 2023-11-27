import { AudioRecorder } from "@/types";

const audioRecorder: AudioRecorder = {
    audioBlob: null,
    mediaRecorder: null,
    audioStream: null,

    start: async () => {
        if (!navigator.mediaDevices && !(navigator.mediaDevices as MediaDevices).getUserMedia) {
            const error = new Error('getUserMedia is not supported on your browser!')
            return Promise.reject(error);
        } else {
            try {
                audioRecorder.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
                audioRecorder.mediaRecorder = new MediaRecorder(audioRecorder.audioStream)
                audioRecorder.audioBlob = null

                audioRecorder.mediaRecorder.addEventListener('dataavailable', event => {
                    audioRecorder.audioBlob = event.data
                })
                audioRecorder.mediaRecorder?.start()
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        }
    },
    stopStream: () => {
        audioRecorder.audioStream?.getTracks().forEach(track => track.stop())
    },

    resetRecording: () => {
        audioRecorder.mediaRecorder = null
        audioRecorder.audioStream = null
    },

    stop: async () => {
        try {
            return new Promise(resolve => {
                const mimeType = audioRecorder.mediaRecorder?.mimeType || 'audio/wav'
                audioRecorder.mediaRecorder?.addEventListener('stop', () => {
                    if (audioRecorder.audioBlob) {
                        const blob = new Blob([audioRecorder.audioBlob], { type: mimeType })
                        resolve(blob)
                    }
                })
                audioRecorder.mediaRecorder?.stop()
                audioRecorder.stopStream()
                audioRecorder.resetRecording()
            })
        } catch (error) {
            console.log("Error in stop", error)
            return Promise.reject(error)
        }
    },
}

export default audioRecorder