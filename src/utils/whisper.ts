import { InferenceSession, Tensor, TypedTensor } from 'onnxruntime-web'

class Whisper {

    session: InferenceSession | null;
    min_length: Int32Array;
    max_length: Int32Array;
    num_return_sequences: Int32Array;
    length_penalty: Float32Array;
    repetition_penalty: Float32Array;
    attention_mask: Int32Array;

    constructor() {
        this.session = null;
        this.min_length = Int32Array.from({ length: 1 }, () => 1);
        this.max_length = Int32Array.from({ length: 1 }, () => 448);
        this.num_return_sequences = Int32Array.from({ length: 1 }, () => 1);
        this.length_penalty = Float32Array.from({ length: 1 }, () => 1.);
        this.repetition_penalty = Float32Array.from({ length: 1 }, () => 1.);
        this.attention_mask = Int32Array.from({ length: 1 * 80 * 3000 }, () => 0);
    }

    async loadModel(url: string, callback?: (err?: unknown) => void) {
        try {
            const session = await InferenceSession.create(url, {
                executionProviders: ["wasm"],
                logSeverityLevel: 3,
                logVerbosityLevel: 3,
            })
            this.session = session;
            callback?.()
        } catch (error) {
            console.log("Error in loadModel", error)
            callback?.(error)
        }
    }

    async run(audio_pcm: TypedTensor<'float32'>, beams = 1) {
        // clone semi constants into feed. The clone is needed if we run with ort.env.wasm.proxy=true
        const feed = {
            "audio_pcm": audio_pcm,
            "max_length": new Tensor(new Int32Array(this.max_length), [1]),
            "min_length": new Tensor(new Int32Array(this.min_length), [1]),
            "num_beams": new Tensor(Int32Array.from({ length: 1 }, () => beams), [1]),
            "num_return_sequences": new Tensor(new Int32Array(this.num_return_sequences), [1]),
            "length_penalty": new Tensor(new Float32Array(this.length_penalty), [1]),
            "repetition_penalty": new Tensor(new Float32Array(this.repetition_penalty), [1]),
            // "attention_mask": new Tensor(new Int32Array(this.attention_mask), [1, 80, 3000]),
        }

        return this.session?.run(feed);
    }
}

export default Whisper;