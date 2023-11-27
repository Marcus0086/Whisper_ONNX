import LoadModel from "@/components/loadModel";
import MicButton from "@/components/micButton";
import Modal from "@/components/modal";

const Page = () => {
    return <>
        <main className="flex flex-col items-center justify-center h-screen gap-y-6">
            <LoadModel />
            <MicButton />
        </main>
        <Modal />
    </>
}

export default Page;