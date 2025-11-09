import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [language, setLanguage] = useState("EN");
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const [texts, setTexts] = useState({
    EN: {
      email: "Email",
      password: "Password",
      login: "Login",
      menu1: "Home",
      menu2: "Contact",
    },
    SE: {
      email: "E-post",
      password: "Lösenord",
      login: "Logga in",
      menu1: "Hem",
      menu2: "Kontakt",
    },
  });

  
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/translations?page=login&lang=${language.toLowerCase()}`
        );
        const data = await res.json();
        if (data.success) {
          setTexts((prev) => ({
            ...prev,
            [language]: {
              email: data.data.emailLabel || prev[language].email,
              password: data.data.passwordLabel || prev[language].password,
              login: data.data.loginButton || prev[language].login,
              menu1: prev[language].menu1,
              menu2: prev[language].menu2,
            },
          }));
        }
      } catch (err) {
        console.error("Error fetching translations:", err);
      }
    };
    fetchTranslations();
  }, [language]);

 
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        alert(`Login successful! Welcome, ${data.data.name}`);
        localStorage.setItem("token", data.accessToken); 
       
        window.location.href = "/pricelist";
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Server error. Check backend console.");
    }
  };

  return (
    <div className="login-container">
      
      <div className="top-left">
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="diamond"
          className="diamond"
        />
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <a href="#">{texts[language].menu1}</a>
          <a href="#">{texts[language].menu2}</a>
        </div>
      </div>

      
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
        <h2>{texts[language].login}</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder={texts[language].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={texts[language].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={togglePassword}>
            👁
          </span>
        </div>
        <button type="button" onClick={handleLogin}>
          {texts[language].login}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;













