import LayoutStore from '@/context/layoutStore'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'styles/globals.css'

// const inter = Inter({ subsets: ['latin'] })

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Whisper In Browser',
  description: 'Run Whisper model in Browser with ONNX and Olive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LayoutStore>
          {children}
        </LayoutStore>
      </body>
    </html>
  )
}
