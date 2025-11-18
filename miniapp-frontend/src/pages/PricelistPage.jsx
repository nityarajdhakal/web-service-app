import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PricelistPage.css";
import HamburgerMenu from "../components/HamburgerMenu";
import { Search, Plus, Printer, SlidersHorizontal, ChevronDown, MoreVertical } from "lucide-react";
import {
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiBook,
  FiLayers,
  FiPackage,
  FiShoppingCart,
  FiLogOut,
  FiInbox
} from "react-icons/fi";
import API_BASE_URL from "../config/api";

const sidebarLinks = [
  { label: "Invoices", icon: <FiFileText /> },
  { label: "Customers", icon: <FiUsers /> },
  { label: "My Business", icon: <FiBriefcase /> },
  { label: "Invoice Journal", icon: <FiBook /> },
  { label: "Price List", icon: <FiLayers />, active: true },
  { label: "Multiple Invoicing", icon: <FiPackage /> },
  { label: "Unpaid Invoices", icon: <FiShoppingCart /> },
  { label: "Offer", icon: <FiInbox /> }
];

const PricelistPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [texts, setTexts] = useState({});
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        
        const langCode = language === "SE" ? "sv" : "en";
        const res = await fetch(`${API_BASE_URL}/translations?page=pricelist&lang=${langCode}`);
        
        if (!res.ok) {
          const text = await res.text();
          console.error("Server responded with error:", res.status, text);
          return;
        }

        const data = await res.json();
        if (data.success) {
          console.log('Pricelist translations loaded:', data.data);
          setTexts(data.data);
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
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Server responded with error:", res.status, text);
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            navigate("/login");
          }
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
    if (!productToUpdate) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productToUpdate)
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Server responded with error:", res.status, text);
          alert('Server error: ' + res.status);
          return;
        }

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
      
      <header className="pricelist-header">
        <div className="header-left">
          <HamburgerMenu texts={texts} page="pricelist" />
          <h1 className="header-title">{texts.title || 'Pricelist'}</h1>
        </div>
        <div className="header-right">
          <div className="language-toggle-header" onClick={() => setLanguage(language === "EN" ? "SE" : "EN")} style={{cursor: 'pointer'}}>
            <span className="language-text">{language === "EN" ? "English" : "Svenska"}</span>
            <img 
              src={language === "EN" ? "https://storage.123fakturere.no/public/flags/GB.png" : "https://storage.123fakturere.no/public/flags/SE.png"}
              alt={language === "EN" ? "English" : "Swedish"} 
              className="header-flag"
            />
          </div>
        </div>
      </header>

      
      <div className="pricelist-layout">
        <aside className="pricelist-sidebar">
          <div className="sidebar-profile">
            <div className="profile-avatar">NR</div>
            <div>
              <p>nityaraj</p>
              <span>Storjord AS</span>
            </div>
          </div>
          <div className="sidebar-links">
            {sidebarLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                className={`sidebar-link ${link.active ? "active" : ""}`}
                aria-label={link.label}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            <button type="button" className="sidebar-link logout">
              <FiLogOut /> <span>Log out</span>
            </button>
          </div>
        </aside>

        <div className="pricelist-main-content">
          <div className="pricelist-controls">
            <div className="search-bars">
              <div className="search-bar">
                <input type="text" placeholder={texts.searchArticle || "Search Article No..."} disabled />
                <Search size={20} color="#1e88e5" />
              </div>
              <div className="search-bar">
                <input type="text" placeholder={texts.searchProduct || "Search Product..."} disabled />
                <Search size={20} color="#1e88e5" />
              </div>
            </div>
            <div className="action-buttons">
              <button className="action-btn new-product-btn" title={texts.newProduct || "New Product"}>
                <Plus size={20} />
              </button>
              <button className="action-btn print-btn" title={texts.printList || "Print List"}>
                <Printer size={20} />
              </button>
              <button className="action-btn advanced-btn" title={texts.advancedMode || "Advanced mode"}>
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-wrapper">
              <table className="pricelist-table">
                <thead>
                  <tr>
                    <th className="article-col">
                      {texts.articleNo || 'Article No.'}
                      <ChevronDown size={16} className="sort-icon" />
                    </th>
                    <th className="product-col">
                      {texts.productService || 'Product/Service'}
                      <ChevronDown size={16} className="sort-icon" />
                    </th>
                    <th className="in-price-col">{texts.inPrice || 'In Price'}</th>
                    <th className="price-col">{texts.price || 'Price'}</th>
                    <th className="unit-col">{texts.unit || 'Unit'}</th>
                    <th className="stock-col">{texts.inStock || 'In Stock'}</th>
                    <th className="desc-col">{texts.description || 'Description'}</th>
                    <th className="actions-col">...</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="no-products">
                        {texts.noProducts || 'No products available.'}
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id}>
                        <td data-label={texts.articleNo || "Article No."} className="article-col">
                          <input 
                            type="text" 
                            value={product.article_no || ''} 
                            onChange={(e) => handleInputChange(product.id, 'article_no', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.productService || "Product/Service"} className="product-col">
                          <input 
                            type="text" 
                            value={product.product_name || ''} 
                            onChange={(e) => handleInputChange(product.id, 'product_name', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.inPrice || "In Price"} className="in-price-col">
                          <input 
                            type="number" 
                            value={product.in_price || ''} 
                            onChange={(e) => handleInputChange(product.id, 'in_price', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.price || "Price"} className="price-col">
                          <input 
                            type="number" 
                            value={product.price || ''} 
                            onChange={(e) => handleInputChange(product.id, 'price', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.unit || "Unit"} className="unit-col">
                          <input 
                            type="text" 
                            value={product.unit || ''} 
                            onChange={(e) => handleInputChange(product.id, 'unit', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.inStock || "In Stock"} className="stock-col">
                          <input 
                            type="number" 
                            value={product.in_stock || ''} 
                            onChange={(e) => handleInputChange(product.id, 'in_stock', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td data-label={texts.description || "Description"} className="desc-col">
                          <input 
                            type="text" 
                            value={product.description || ''} 
                            onChange={(e) => handleInputChange(product.id, 'description', e.target.value)} 
                            onBlur={() => handleUpdateOnBlur(product.id)} 
                          />
                        </td>
                        <td className="actions-col">
                          <MoreVertical size={18} className="actions-icon" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricelistPage;


