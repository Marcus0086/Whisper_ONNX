import { OutputData } from "@editorjs/editorjs";

const DEFAULT_DATA: OutputData = {
    time: 1556098174501,
    blocks: [
        {
            type: 'image',
            data: {
                url: '/preview.png',
                caption: 'Listenerbot by Tars',
                withBorder: false,
                stretched: false,
                withBackground: false,
            }
        },
        {
            type: "paragraph",
            data: {
                text:
                    'Explore the world of audio transcription with "Listenerbot By Tars". Listenerbot offers unparalleled transcription capabilities directly in your web browser.'
            },
        },
        {
            type: "header",
            data: {
                text: "Key features",
                level: 3,
            },
        },
        {
            type: "list",
            data: {
                style: "unordered",
                items: [
                    "State of the Art OpenAI's Whisper model for transcribing speech",
                    "Audio Recorder for recording audio",
                    "Actual transcription of audio into text",
                    "Click on Tab key to get started"
                ],
            },
        }
    ]
}

export {
    DEFAULT_DATA
}