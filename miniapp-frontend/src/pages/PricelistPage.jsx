
import React, { useState, useEffect } from "react";
import "./PricelistPage.css";

const PricelistPage = () => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [texts, setTexts] = useState({
    EN: { title: "Pricelist", productHeader: "Product / Service", inPriceHeader: "In Price", priceHeader: "Price" },
    SE: { title: "Prislista", productHeader: "Produkt / Tjänst", inPriceHeader: "Inpris", priceHeader: "Pris" },
  });
  const [products, setProducts] = useState([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/translations?page=pricelist&lang=${language.toLowerCase()}`);
        const data = await res.json();
        if (data.success) {
          setTexts(prev => ({
            ...prev,
            [language]: {
              title: data.data.title || prev[language].title,
              productHeader: data.data.productHeader || prev[language].productHeader,
              inPriceHeader: data.data.inPriceHeader || prev[language].inPriceHeader,
              priceHeader: data.data.priceHeader || prev[language].priceHeader,
            }
          }));
        }
      } catch (err) {
        console.error("Error fetching translations:", err);
      }
    };
    fetchTranslations();
  }, [language]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authenticated. Please login.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/products", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setProducts(data.data);
        else alert("Failed to fetch products: " + data.message);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pricelist-container">
    
      <div className="top-left">
        <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="diamond" className="diamond"/>
        <div className="hamburger" onClick={toggleMenu}>&#9776;</div>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Contact</a>
        </div>
      </div>

     
      <div className="language-toggle">
        <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" onClick={() => setLanguage("EN")} className={language==="EN"?"active-flag":""}/>
        <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Swedish" onClick={() => setLanguage("SE")} className={language==="SE"?"active-flag":""}/>
      </div>

    
      <h2>{texts[language].title}</h2>
      <table className="pricelist-table">
        <thead>
          <tr>
            <th>{texts[language].productHeader}</th>
            <th>{texts[language].inPriceHeader}</th>
            <th>{texts[language].priceHeader}</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td data-label={texts[language].productHeader}>{product.product_name}</td>
              <td data-label={texts[language].inPriceHeader}>{product.in_price}</td>
              <td data-label={texts[language].priceHeader}>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricelistPage;

