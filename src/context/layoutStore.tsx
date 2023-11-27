import WhisperStoreProvider from "./whisperStore";

const LayoutStore = ({ children }: {
    children: React.ReactNode
}) => {
    return <WhisperStoreProvider>
        {children}
    </WhisperStoreProvider>
}

export default LayoutStore;