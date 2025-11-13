import React, { useEffect, useState } from "react";
import axios from "axios";
import productImg from "../images/productImg.png";

const Featured = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(list.slice(0, 5));
      })
      .catch(() => setProducts([]));
  }, []);


  return (
    <>
      <div id="gallery-head">
        <h1>Gallery</h1>
      </div>
      <div id="card-container">
        {products.map((product, i) => (
          <div className="featured-card" key={product.id ?? i}>
            <img
              className="img"
              src={product.image_url || productImg}
              alt=""
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;