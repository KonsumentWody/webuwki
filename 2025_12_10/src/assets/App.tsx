import {AboutUs, Home, Contact} from "./components";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/aboutUs" className="nav-link">About Us</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;