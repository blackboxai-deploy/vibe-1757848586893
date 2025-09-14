import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Regnum Pecunia - Healthcare Supply Chain Management',
  description: 'Visibility. Accountability. Supply Chain Control. Reigning Over Resources, Securing Your Success',
  keywords: 'healthcare, supply chain, inventory management, SCMS, analytics, AI, forecasting',
  authors: [{ name: 'Regnum Pecunia' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </body>
    </html>
  )
}