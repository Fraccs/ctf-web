import "../assets/styles/index.css"

import { Analytics } from "@vercel/analytics/react"
import { Manrope } from "next/font/google"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/ui/ThemeProvider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const font = Manrope({ subsets: ["latin"] })

export const metadata = {
  title: "ctf-web",
  description: "Collection of CTF solves and writeups"
}

export type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head/>
      <body>
        <Analytics/>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className={`${font.className} h-screen w-screen overflow-auto`}>
            <Header/>
            <div className="h-full flex flex-col">
              {children}
              <Footer/>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
