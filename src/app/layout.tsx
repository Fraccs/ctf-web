import "../assets/styles/index.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ctf-web",
  description: "Collection of CTF solves and writeups"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} absolute h-full w-full flex flex-col`}>
        <Header/>
        <Analytics/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
