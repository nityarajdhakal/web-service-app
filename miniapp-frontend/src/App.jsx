import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import PricelistPage from "./pages/PricelistPage";


function App() {
  
  const [page, setPage] = useState("login");

  // 
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/pricelist") setPage("pricelist");
   
    else setPage("login");
  }, []);

  
  const navigate = (newPage) => {
    setPage(newPage);
    window.history.pushState({}, "", `/${newPage}`);
  };

  return (
    <div>
      {page === "login" && <LoginPage />}
      {page === "terms" && <TermsPage />}
      {page === "pricelist" && <PricelistPage />}
    </div>
  );
}

export default App;



