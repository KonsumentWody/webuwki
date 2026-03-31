import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link to="/" className="logo">MyBlog</Link>

                <div className="links">
                    <Link to="/">Strona główna</Link>
                    <Link to="/categories">Kategorie</Link>
                </div>
            </div>
        </nav>
    );
}