import type { Metadata } from 'next'
import Script from 'next/script'
import { FhevmProvider } from './providers/FhevmProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FHEVM NextJS App',
  description: 'NextJS app with FHEVM SDK integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs"
          strategy="beforeInteractive"
        />
        <FhevmProvider>
          {children}
        </FhevmProvider>
      </body>
    </html>
  )
}
