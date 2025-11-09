import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ texts, page }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    return (
        <div className="top-left-container">
            <img
                src="https://storage.123fakturera.se/public/icons/diamond.png"
                alt="diamond logo"
                className="diamond-logo"
            />
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                &#9776;
            </div>
            <div className={`menu ${menuOpen ? "open" : ""}`}>
                {/* Using Link for SPA navigation */}
                <Link to="/home">{texts.menuHome || 'Home'}</Link>
                <Link to="#">{texts.menuContact || 'Contact'}</Link>
                <Link to="/terms">Terms</Link>
                {page !== 'login' && <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>}
            </div>
        </div>
    );
};

export default HamburgerMenu;

