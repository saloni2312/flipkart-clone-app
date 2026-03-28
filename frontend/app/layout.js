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

                <footer className="footer">
                    <div className="footer-inner">
                        <div className="footer-col">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Flipkart Stories</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Help</h3>
                            <ul>
                                <li><a href="#">Payments</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Cancellation</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Policy</h3>
                            <ul>
                                <li><a href="#">Return Policy</a></li>
                                <li><a href="#">Terms Of Use</a></li>
                                <li><a href="#">Security</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Social</h3>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div>
                            <span>Become a Seller</span>
                            <span>Advertise</span>
                            <span>Gift Cards</span>
                            <span>Help Center</span>
                        </div>
                        <span>© 2024 Flipkart Clone. All rights reserved.</span>
                    </div>
                </footer>
            </body>
        </html>
    );
}
