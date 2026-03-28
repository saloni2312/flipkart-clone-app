import './globals.css';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Flipkart — Online Shopping',
    description: 'India\'s leading e-commerce platform. Shop Electronics, Fashion, Home & Kitchen and more.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
