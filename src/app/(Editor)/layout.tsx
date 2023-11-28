import 'styles/editor.css'

const EditorLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return <main>
        {children}
    </main>
}

export default EditorLayout