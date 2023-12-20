import audioProcessor from "@/utils/audio_processor";
import audioRecorder from "@/utils/recoder";
import Whisper from "@/utils/whisper";

class Transcriber {

    audioRecorder = audioRecorder
    audioProcessor = audioProcessor;
    whisper = new Whisper();
    isRecording = false;
    data = {};

    constructor({ data }) {
        this.data = data;
        this.whisper.loadModel('/_next/static/chunks/model/whisper.onnx')
    }
    static get toolbox() {
        return {
            title: 'Audio Transcriber',
            icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="h-8 w-8 cursor-not-allowed" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path></svg>'
        };
    }

    render() {
        const parent = document.createElement('div');
        parent.className = 'flex w-full items-center justify-center';
        const div = document.createElement('div');
        const button = document.createElement('button');
        div.contentEditable = true;
        div.innerText += this.data.text || '';
        div.className = 'ce-paragraph cdx-block w-full';
        button.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="h-8 w-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path></svg>';
        button.onclick = async () => {
            if (!this.isRecording) {
                this.audioRecorder?.start().then(() => {
                    button.innerHTML = 'Recording...';
                    this.isRecording = true;
                });
            } else {
                this.audioRecorder?.stop().then(blob => {
                    if (blob) {
                        button.innerHTML = "Processing...";
                        button.disabled = true;
                        button.classList.add('cursor-not-allowed');
                        this.audioProcessor?.transcribe(blob, this.whisper).then(text => {
                            div.innerText += text;
                            this.isRecording = false;
                            button.disabled = false;
                            button.classList.remove('cursor-not-allowed');
                            button.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="h-8 w-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path></svg>';
                        })
                    }
                })
            }
        }
        parent.appendChild(div);
        parent.appendChild(button);
        return parent;
    }

    save(blockContent) {
        return {
            text: blockContent.children[0].innerText
        }
    }
}

export default Transcriber;