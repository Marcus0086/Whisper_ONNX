'use client';

import { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

import Transcriber from "@/components/transcriberPlugin";

import { DEFAULT_DATA } from "@/utils/constants";

import useLocalStorage from "@/hooks/useLocalStorage";


const EditorWrapper = ({ holder }) => {
    const ref = useRef(null);
    const [data, setData] = useLocalStorage("editorData", null);

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                autofocus: true,
                data: data?.blocks?.length > 0 ? data : DEFAULT_DATA,
                tools: {
                    header: {
                        class: Header,
                        shortcut: "CMD+SHIFT+H",
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        }
                    },
                    image: SimpleImage,
                    audio: Transcriber
                },
                async onChange(api, event) {
                    const data = await api.saver.save();
                    setData(data);
                },
            });
            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, [holder, ref]);


    return <div id={holder} className="prose max-w-full" />;
}

export default EditorWrapper;