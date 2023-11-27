'use client'

import { useEffect, useState } from "react"
import { MdOutlineContentCopy } from "react-icons/md";
import { MdDone } from "react-icons/md";

import { useWhsiperSettings } from "@/context/whisperStore"

const Modal = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const { settings: { text } } = useWhsiperSettings()

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        if (text && text.length > 0) {
            openModal()
        }
    }, [text])

    const handleCopy = async () => {
        if (text && text.length > 0) {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        }
    }
    return <>
        {isOpen ? <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="bg-[#151515] inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="w-full">
                        <div className="w-full">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-xs leading-6 font-medium p-4">
                                    Transcription
                                </h3>
                                <div className="w-full bg-[#444441] flex h-[1px]" />
                                <div className="p-4">
                                    <p className="text-sm text-gray-500">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center">
                        <button
                            onClick={closeModal}
                            className="bg-gradient-to-tr from-[#3684cf] to-[#835fdf] w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Done
                        </button>
                        {isCopied ?
                            <button className="text-xs">
                                <MdDone className="h-4 w-4" />
                            </button> :
                            <button onClick={handleCopy}>
                                <MdOutlineContentCopy className="h-4 w-4" />
                            </button>}
                    </div>
                </div>
            </div>
        </div> : null}
    </>
}

export default Modal;