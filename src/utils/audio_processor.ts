import { Tensor } from 'onnxruntime-web';

import Whisper from './whisper';

import { AudioProcessor } from '@/types';


const audioProcessor: AudioProcessor = {
    kSampleRate: 16000,
    kIntervalAudio_ms: 1000,
    kSteps: 16000 * 30,
    kDelay: 100,

    sleep: (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    processAudio: async (audio: Float32Array, startTime: number, index: number, position: number, whisper: Whisper) => {
        if (index < audio.length) {
            try {
                const xa = audio.slice(index, index + audioProcessor.kSteps);
                const audio_pcm = new Tensor(xa, [1, xa.length]);
                const ret = await whisper.run(audio_pcm);
                let text = ""
                if (ret) {
                    text += `${ret.str.data[0]}\n`;
                }
                return text;
            } catch (error) {
                console.log("Error in processAudio", error)
                return ""
            }
        } else {
            console.log(`total time: ${(performance.now() - startTime) / 1000} s`);
            return ""
        }
    },

    transcribe: async (audio: Blob, whisper: Whisper) => {
        const audioArrayBuffer = await audio.arrayBuffer();
        const context = new AudioContext({
            sampleRate: audioProcessor.kSampleRate
        });
        const audioBuffer = await context.decodeAudioData(audioArrayBuffer);
        const offlineContext = new OfflineAudioContext({
            numberOfChannels: audioBuffer.numberOfChannels,
            length: audioBuffer.length,
            sampleRate: audioBuffer.sampleRate
        })
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);
        source.start();
        const renderedBuffer = await offlineContext.startRendering();
        const audioData = renderedBuffer.getChannelData(0);
        try {
            let resText = await audioProcessor.processAudio(audioData, performance.now(), 0, 0, whisper)
            return resText
        } catch (error) {
            console.log("Error in transcribe", error)
            return ""
        }
    }
}

export default audioProcessor;