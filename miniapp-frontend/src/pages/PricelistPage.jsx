import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PricelistPage.css";
import HamburgerMenu from "../components/HamburgerMenu";

const API_BASE_URL = "http://localhost:5000/api";

const PricelistPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [texts, setTexts] = useState({});
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Convert EN to 'en' and SE to 'sv' (Swedish language code)
        const langCode = language === "SE" ? "sv" : "en";
        const res = await fetch(`${API_BASE_URL}/translations?page=pricelist&lang=${langCode}`);
        const data = await res.json();
        if (data.success) setTexts(data.data);
      } catch (err) {
        console.error("Error fetching translations:", err);
      }
    };
    fetchTranslations();
  }, [language]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      // The PrivateRoute already checks this, but it's good practice to keep it.
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If the token is expired or invalid, the backend will send a 401 or 403 status.
        // We must handle this explicitly.
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token"); // Remove the invalid token
          navigate("/login"); // Redirect to login
          return;
        }

        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          alert("Failed to fetch products: " + data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleInputChange = (id, field, value) => {
    setProducts(currentProducts =>
      currentProducts.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleUpdateOnBlur = async (id) => {
    const productToUpdate = products.find(p => p.id === id);
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productToUpdate)
        });

        const data = await res.json();
        if (!data.success) {
            alert('Failed to update product: ' + data.message);
        }
    } catch (err) {
        console.error("Error updating product:", err);
        alert('An error occurred while saving.');
    }
  };

  return (
    <div className="pricelist-page-container">
      <HamburgerMenu texts={texts} page="pricelist" />
      
      <div className="language-toggle">
        <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" onClick={() => setLanguage("EN")} className={language === "EN" ? "active-flag" : ""}/>
        <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Swedish" onClick={() => setLanguage("SE")} className={language === "SE" ? "active-flag" : ""}/>
      </div>

      <div className="pricelist-content">
        <h2>{texts.title}</h2>
        <div className="table-wrapper">
          <table className="pricelist-table">
            <thead>
              <tr>
                <th className="product-col">{texts.productHeader}</th>
                <th className="in-price-col">{texts.inPriceHeader}</th>
                <th className="price-col">{texts.priceHeader}</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td data-label={texts.productHeader}>
                    <input type="text" value={product.product_name} onChange={(e) => handleInputChange(product.id, 'product_name', e.target.value)} onBlur={() => handleUpdateOnBlur(product.id)} />
                  </td>
                  <td data-label={texts.inPriceHeader} className="in-price-col">
                    <input type="number" value={product.in_price} onChange={(e) => handleInputChange(product.id, 'in_price', e.target.value)} onBlur={() => handleUpdateOnBlur(product.id)} />
                  </td>
                  <td data-label={texts.priceHeader} className="price-col">
                    <input type="number" value={product.price} onChange={(e) => handleInputChange(product.id, 'price', e.target.value)} onBlur={() => handleUpdateOnBlur(product.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricelistPage;

