import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TermsPage.css";
<<<<<<< HEAD
import API_BASE_URL from "../config/api";

const navLinks = ["Home", "Order", "Our Customers", "About Us", "Contact Us"];

=======
import HamburgerMenu from "../components/HamburgerMenu";
import API_BASE_URL from "../config/api";

>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
const TermsPage = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState("EN");
    const [texts, setTexts] = useState({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const langCode = language === "SE" ? "sv" : "en";
                const res = await fetch(`${API_BASE_URL}/translations?page=terms&lang=${langCode}`);
                
                if (!res.ok) {
                  const text = await res.text();
                  console.error("Server responded with error:", res.status, text);
                  return;
                }

                const data = await res.json();
                if (data.success) {
                    setTexts(data.data);
                }
            } catch (err) {
                console.error("Error fetching translations:", err);
            }
        };
        fetchTranslations();
    }, [language]);

    const handleGoBack = () => {
        navigate(-1);
    };

<<<<<<< HEAD
    const paragraphs = (texts.content || "").split("\n").filter((p) => p.trim().length > 0);

    return (
        <div className="terms-page">
            <header className="terms-top-bar">
                <div className="terms-logo">
                    <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="logo" />
                    <span>123 Fakturera</span>
                </div>
                <nav className="terms-nav">
                    {navLinks.map((link) => (
                        <a href="#" key={link}>{link}</a>
                    ))}
                </nav>
                <div className="terms-language" onClick={() => setLanguage(language === 'EN' ? 'SE' : 'EN')} style={{cursor: 'pointer'}}>
                    <span>{language === 'EN' ? 'English' : 'Svenska'}</span>
                    <img 
                      src={language === 'EN' ? 'https://storage.123fakturere.no/public/flags/GB.png' : 'https://storage.123fakturere.no/public/flags/SE.png'}
                      alt={language === 'EN' ? 'English' : 'Swedish'}
                      className="terms-flag"
=======
    return (
        <div className="terms-page-container new-terms-style">
            <header className="terms-header">
                
                <HamburgerMenu texts={texts} page="terms" />
                

                <nav className="terms-nav">
                    <a href="#">Home</a>
                    <a href="#">Order</a>
                    <a href="#">Our Customers</a>
                    <a href="#">About Us</a>
                    <a href="#">Contact Us</a>
                </nav>
                <div className="terms-language-toggle" onClick={() => setLanguage(language === 'EN' ? 'SE' : 'EN')} style={{cursor: 'pointer'}}>
                    <span>{language === 'EN' ? 'English' : 'Svenska'}</span>
                    <img 
                      src={language === 'EN' ? 'https://storage.123fakturere.no/public/flags/GB.png' : 'https://storage.123fakturere.no/public/flags/SE.png'} 
                      alt="Language Flag"
>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
                    />
                </div>
            </header>

<<<<<<< HEAD
            <main className="terms-body">
                <section className="terms-card">
                    <h1>{texts.title || "Terms"}</h1>
                    <div className="terms-content-box">
                        {paragraphs.length > 0 ? (
                            paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>{texts.content}</p>
                        )}
                    </div>
                    <button onClick={handleGoBack} className="close-button">
                        {texts.closeButton || "Close and Go Back"}
                    </button>
                </section>
            </main>

            
=======
            <main className="terms-main-content">
                <h1>{texts.title || "Terms"}</h1>
                <button onClick={handleGoBack} className="close-button">
                    {texts.closeButton || "Close and Go Back"}
                </button>
                <div className="terms-content-box">
                    <p>{texts.content}</p>
                </div>
            </main>
>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
        </div>
    );
};

export default TermsPage;

