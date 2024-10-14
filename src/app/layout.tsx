import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/site/config"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  creator: "Rafa Canosa",
  authors: { name: "Rafa Canosa" },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
    },
  },
  keywords: ["Movies", "Movie ticketing", "Open source"],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@rafacanosa",
    creator: "@rafacanosa",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/favicon.ico",
        alt: SITE_TITLE,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="grid grid-cols-5 grid-rows-1 gap-4">
          <div className="col-span-5 md:col-span-3 md:col-start-2 row">
            <Header />
          </div>
          <div className="col-span-5 md:col-span-3 row-span-3 md:col-start-2 row-start-2 mb-16 mx-auto">
            {children}
          </div>
          <div className="col-span-5 md:col-span-3 md:col-start-2">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
