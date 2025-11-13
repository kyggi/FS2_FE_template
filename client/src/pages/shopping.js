import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Product from "../components/product";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const Shopping = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  // === Fetch products ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/api/ecommerce/products`);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // === Filter products by search ===
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [products, searchTerm]);

  // === Fetch cart ===
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API}/api/ecommerce/cart`);
      setCartList(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // === Add to cart ===
  const addToCart = async (product) => {
    try {
      await axios.post(`${API}/api/ecommerce/cart`, { product });
      await fetchCart(); // refresh live count
    } catch (err) {
      console.error("Unable to add to cart:", err);
    }
  };

  // === Render products ===
  const renderProducts = () =>
    filteredProducts.map((product) => (
      <Product key={product.id} product={product} addToCart={addToCart} />
    ));

  return (
    <div className="main">
      <header id="shopping-head">
        <button onClick={() => navigate("/cart")} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>

      <div id="shopping">
        {productsLoading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!productsLoading && !error && filteredProducts.length === 0 && (
          <p>No products available at the moment.</p>
        )}
        {!productsLoading && !error && filteredProducts.length > 0 && renderProducts()}
      </div>
    </div>
  );
};

export default Shopping;
