import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.scss';

const Layout: React.FC = () => {
    return (
        <div className="app-wrapper">
            <nav className="navbar">
                <div className="container nav-content">
                    <Link to="/" className="logo">Dev<span>Blog</span></Link>
                    <ul className="nav-links">
                        <li><Link to="/">Główna</Link></li>
                        <li><Link to="/categories">Kategorie</Link></li>
                    </ul>
                </div>
            </nav>

            <main className="container main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2026 Modern Blog System. Built with React & TS.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;