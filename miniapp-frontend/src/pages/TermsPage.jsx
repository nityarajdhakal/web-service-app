import React, { useState, useEffect } from "react";
import "./TermsPage.css";
import HamburgerMenu from "../components/HamburgerMenu";

const API_BASE_URL = "http://localhost:5000/api";

const TermsPage = () => {
    const [language, setLanguage] = useState("EN");
    const [texts, setTexts] = useState({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                // Convert EN to 'en' and SE to 'sv' (Swedish language code)
                const langCode = language === "SE" ? "sv" : "en";
                const res = await fetch(`${API_BASE_URL}/translations?page=terms&lang=${langCode}`);
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

    return (
        <div className="terms-page-container">
            <HamburgerMenu texts={{}} page="terms" />

            <div className="language-toggle">
              <img
                src="https://storage.123fakturere.no/public/flags/GB.png"
                alt="English"
                onClick={() => setLanguage("EN")}
                className={language === "EN" ? "active-flag" : ""}
              />
              <img
                src="https://storage.123fakturere.no/public/flags/SE.png"
                alt="Swedish"
                onClick={() => setLanguage("SE")}
                className={language === "SE" ? "active-flag" : ""}
              />
            </div>

            <div className="terms-content-box">
                <h2>{texts.title}</h2>
                <p className="last-updated">{texts.lastUpdated}</p>
                <p>{texts.content}</p>
            </div>
        </div>
    );
};

export default TermsPage;

