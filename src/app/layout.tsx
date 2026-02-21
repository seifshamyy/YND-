import type { Metadata } from 'next'
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SmoothScroller } from '@/components/SmoothScroller'
import { LenisScroll } from '@/components/LenisScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { Preloader } from '@/components/Preloader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'YND+ | Architecture and Interior Design',
  description: 'Architecture and interiors that work — and last. Serious, material-driven, execution-oriented studio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-white">
        <Preloader />
        <LenisScroll />
        <CustomCursor />
        <SmoothScroller />
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
