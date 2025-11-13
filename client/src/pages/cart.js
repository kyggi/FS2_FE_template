import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const Cart = () => {
  console.log("🟢 Cart component rendered");

  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API}/api/ecommerce/cart`);
      setCartList(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API}/api/ecommerce/cart/${id}`);
      await fetchCart(); // refresh list after deleting
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p style={{ marginTop: "120px" }}>Loading cart...</p>;

  console.log("🟢 Cart component rendered, items:", cartList);

  
  return (
  <div
    id="cart-container"
    style={{
      border: "4px solid red",
      background: "orange",
      marginTop: "120px",
      padding: "30px",
      position: "relative",
      zIndex: 9999,
      minHeight: "400px",
    }}
  >




      <h1 id="cart-title">Your Cart</h1>
      {cartList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="card-container">
            {cartList.map((item) => (
              <div className="card" key={item.id}>
                <div id="product">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name || "Product"}
                      style={{
                        width: "100%",
                        maxWidth: "160px",
                        height: "160px",
                        objectFit: "contain",
                        marginBottom: "8px",
                      }}
                    />
                  )}
                  <h2>{item.name}</h2>
                  <h3>{item.description}</h3>
                  <h3>${item.price}</h3>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button id="checkout-btn">Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
