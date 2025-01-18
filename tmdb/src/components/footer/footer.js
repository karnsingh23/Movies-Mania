import React from "react";
import "./footer.css"; // Add your styles here if using external CSS
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Brief Description */}
                <div className="footer-section">
                    <h2 className="footer-logo">MovieApp</h2>
                    <p>Your one-stop destination for movie reviews, ratings, and favorites.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">About</Link></li>
                        <li><Link to="">Contact Us</Link></li>
                        <li><Link to="/myProfile">My Favorites</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="footer-contact">
                        <li>Email: support@movieapp.com</li>
                        <li>Phone: +123-456-7890</li>
                        <li>Address: 123 Movie St, Film City, Hollywood</li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MovieApp. All rights reserved.</p>
                <div className="footer-message">
    <p>Sometimes data may not appear due to an API issue. Refreshing the page 4 to 5 times may resolve the problem. If the issue persists, please try again later or <a href="/contact">contact support</a>.</p>
</div>

            </div>
        </footer>
    );
};

export default Footer;
