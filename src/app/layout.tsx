import LayoutStore from '@/context/layoutStore'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import 'styles/globals.css'

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Listenerbot by Tars',
  description: 'Explore the world of audio transcription with "Listenerbot By Tars". Listenerbot offers unparalleled transcription capabilities directly in your web browser.',
  openGraph: {
    images: ['/preview.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/preview.png']
  },
  keywords: [
    'listenerbot',
    'listenerbot by tars',
  ]
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
