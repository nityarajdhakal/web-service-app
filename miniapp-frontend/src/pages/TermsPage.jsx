import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TermsPage.css";
import API_BASE_URL from "../config/api";

const navLinks = ["Home", "Order", "Our Customers", "About Us", "Contact Us"];

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
                    />
                </div>
            </header>

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

            
        </div>
    );
};

export default TermsPage;

