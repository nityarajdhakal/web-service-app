import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ texts, page }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutAndGoHome = (e) => {
        if (e) e.preventDefault();
        localStorage.removeItem("token");
        navigate('/login');
        setMenuOpen(false);
    };

    const handleNavigateTo = (path, e) => {
        if (e) e.preventDefault();
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div className="top-left-container">
            <img
                src="https://storage.123fakturera.se/public/icons/diamond.png"
                alt="diamond logo"
                className="diamond-logo"
                onError={(e) => {
                    console.warn('Failed to load diamond logo:', e);
                    // Fallback: use a simple text or icon
                    e.target.style.display = 'none';
                }}
            />
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <div className={`menu ${menuOpen ? "open" : ""}`}>
                <button onClick={handleLogoutAndGoHome} style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '8px'}}>
                    {texts.menuHome || 'Home'}
                </button>

                <button onClick={(e) => handleNavigateTo('/contact', e)} style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '8px'}}>
                    {texts.menuContact || 'Contact'}
                </button>

                <button onClick={(e) => handleNavigateTo('/terms', e)} style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '8px'}}>
                    Terms
                </button>

                {page !== 'login' && (
                    <button onClick={handleLogoutAndGoHome} style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '8px'}}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default HamburgerMenu;

