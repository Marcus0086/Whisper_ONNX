'use client'

import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/editorjs"), { ssr: false })

const EditorDocument = () => {

    return <section className="py-2 px-4">
        <Editor holder="editor" />
    </section>
}

export default EditorDocument