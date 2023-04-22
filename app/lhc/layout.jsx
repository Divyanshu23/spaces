import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
    title: "IITK Lecture Halls",
    description: 'Book Lecture Halls, Auditorium, Labs, etc within IIT Kanpur campus in clicks with Spaces',
}

export default function RootLayout({ children }) {
    return (
        <>
            <Link className="flex justify-center" href="/">
                <Image src="/logo.png" alt="logo" width={300} height={100} sizes="10vw" style={{ width: '20%', height: 'auto' }} priority />
            </Link>
            {children}
        </>
    )
}
