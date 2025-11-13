import React, { useState } from "react";
import "./styling/App.css";
import "./styling/nav.css";
import "./styling/footer.css";
import "./styling/home.css";
import "./styling/shopping.css";
import "./styling/about.css";
import "./styling/account.css";
import "./styling/contact.css";
import "./styling/hero.css";
import "./styling/featured.css";

import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";
import Home from "./pages/home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar, Footer } from "./components";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shopping"
            element={<Shopping searchTerm={searchTerm} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
