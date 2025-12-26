import type { Metadata } from 'next'
import './globals.css'
import './index.css';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Agnos Health',
    description: 'Healthcare application',
    icons: {
        icon: '/agnos-favicon.jpg',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="grid min-h-screen grid-rows-[auto_1fr] bg-gradient-to-br from-purple-50 to-blue-50" suppressHydrationWarning>
                <div className="my-3">
                    <Link href="/">
                        <img src="/agnos-logo.png" alt="agnos_health_logo" width={150} className="mx-auto" />
                    </Link>
                </div>
                <div className="p-4 h-full">
                    {children}
                </div>
            </body>
        </html>
    )
}