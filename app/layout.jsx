import Head from 'next/head'
import { Providers } from '@/store/Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Toast from '@/components/Toast';

export const metadata = {
  title: "Spaces: IITK's Booking Solution",
  description: 'Book Lecture Halls, Auditorium, Labs, etc within IIT Kanpur campus in clicks with Spaces',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Toast/>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
