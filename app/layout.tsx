import type React from "react"
import "@/styles/globals.css"
import { Analytics } from '@vercel/analytics/next';
import { Cormorant_Garamond, Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${cormorant.variable} font-sans`}>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}



import './globals.css'
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Casamento do Ano <3',
	description: 'by Bernardo Alves'
}
