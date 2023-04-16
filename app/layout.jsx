import Head from 'next/head'
import Navbar from "@/components/Navbar";

import './globals.css'

export const metadata = {
  title: "Spaces: IITK's LHC Booking Solution",
  description: 'Book Lecture Halls, Auditorium, Labs, etc within IIT Kanpur campus in clicks with Spaces',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}