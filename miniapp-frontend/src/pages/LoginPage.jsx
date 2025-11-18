import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
<<<<<<< HEAD
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API_BASE_URL from "../config/api";

const navLinks = ["Home", "Order", "Our Customers", "About Us", "Contact Us"];

=======
import HamburgerMenu from "../components/HamburgerMenu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API_BASE_URL from "../config/api";

>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
const LoginPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("test@example.com"); 
  const [password, setPassword] = useState("password123"); 
  const [texts, setTexts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        
        const langCode = language === "SE" ? "sv" : "en";
        const res = await fetch(`${API_BASE_URL}/translations?page=login&lang=${langCode}`);
        
        if (!res.ok) {
          const text = await res.text();
          console.error("Server responded with error:", res.status, text);
          return;
        }

        const data = await res.json();
        if (data.success) {
          setTexts(data.data);
        } else {
          console.error("Failed to fetch translations:", data.message);
        }
      } catch (err) {
        console.error("Error fetching translations:", err);
      }
    };
    fetchTranslations();
  }, [language]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server responded with error:", response.status, text);
        setError("Server error: " + response.status);
        return;
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.accessToken);
        navigate("/pricelist"); 
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-page">
      <header className="login-header">
        <div className="login-logo">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="logo"
          />
          <span>123 Fakturera</span>
        </div>
        <nav className="login-nav">
          {navLinks.map((link) => (
            <a href="#" key={link}>
              {link}
            </a>
          ))}
        </nav>
        <div className="login-language" onClick={() => setLanguage(language === "EN" ? "SE" : "EN")} style={{cursor: 'pointer'}}>
          <span>{language === "EN" ? "English" : "Svenska"}</span>
          <img
            src={language === "EN" ? "https://storage.123fakturere.no/public/flags/GB.png" : "https://storage.123fakturere.no/public/flags/SE.png"}
            alt={language === "EN" ? "English" : "Swedish"}
            className="language-flag"
          />
        </div>
      </header>

      <main className="login-content">
        <section className="login-card">
          <h1>{texts.loginTitle || "Log in"}</h1>
          <form onSubmit={handleLogin}>
            <label className="login-field">
              <span>{texts.emailLabel || "Enter your email address"}</span>
              <input
                type="email"
                placeholder={texts.emailPlaceholder || "Email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="login-field">
              <span>{texts.passwordLabel || "Enter your password"}</span>
              <div className="login-password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={texts.passwordPlaceholder || "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </label>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-submit">
              {texts.loginButton || "Log in"}
            </button>
          </form>
          <div className="login-links">
            <a href="#" className="link-button">
              {texts.registerLink || "Register"}
            </a>
            <a href="#" className="link-button">
              {texts.forgotLink || "Forgotten password?"}
            </a>
          </div>
        </section>
      </main>

      <footer className="login-footer">
  {/* Top row for brand name and navigation */}
  <div className="footer-top-row">
    <span className="footer-brand">123 Fakturera</span>
    <nav className="login-footer-nav">
      <a href="#">Home</a>
      <a href="#">Order</a>
      <a href="#">Contact us</a>
    </nav>
  </div>

  {/* Horizontal divider line */}
  <hr className="footer-divider" />

  {/* Bottom row for copyright information */}
  <div className="footer-bottom-row">
    <span>© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</span>
  </div>
</footer>

=======
    <div className="login-page-container">
      <HamburgerMenu texts={texts} page="login" />
      
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

      <div className="login-box">
        <h2>{texts.loginTitle || 'Login'}</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder={texts.emailPlaceholder || 'Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={texts.passwordPlaceholder || 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
</span>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{texts.loginButton || 'Login'}</button>
        </form>
      </div>
>>>>>>> c2af40e68f6200fee22d77768f0fcbc5157a8105
    </div>
  );
};

export default LoginPage;













