require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Huynh08k!",
  database: process.env.DB_NAME || "fsschema",
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

// CONTACT FORM ROUTE
app.post("/submit-form", (req, res) => {
  const { First_name, Last_name, Email, message } = req.body;

  if (!First_name || !Last_name || !Email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sqlInsert = `
    INSERT INTO contact_form (First_name, Last_name, Email, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sqlInsert, [First_name, Last_name, Email, message], (err) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    console.log("Contact form data inserted successfully");
    res.status(200).json({ message: "Form submitted successfully" });
  });
});

// PRODUCTS ROUTE
app.get("/api/ecommerce/products", (req, res) => {
  const sqlSelect = "SELECT * FROM products";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Database fetch error:", err);
      res.status(500).send("Error retrieving products");
    } else {
      console.log("Products retrieved:", result.length);
      res.status(200).send(result);
    }
  });
});

// =====================
// CART ROUTES (MySQL)
// =====================

// Get all cart items
app.get("/api/ecommerce/cart", (req, res) => {
  const sqlSelect = "SELECT * FROM cart";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Error fetching cart:", err);
      return res.status(500).send("Error fetching cart");
    }
    res.status(200).json(result);
  });
});

// Add a product to cart
app.post("/api/ecommerce/cart", (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: "Missing product data" });
  }

  const { name, description, price, image_url } = product;

  const sqlInsert = `
    INSERT INTO cart (name, description, price, image_url)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sqlInsert, [name, description, price, image_url], (err, result) => {
    if (err) {
      console.error("Error inserting into cart:", err);
      return res.status(500).json({ error: "Failed to add to cart" });
    }

    console.log("Added to cart:", name);
    res
      .status(201)
      .json({ message: "Product added to cart", id: result.insertId });
  });
});

// Remove a product from cart by ID
app.delete("/api/ecommerce/cart/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM cart WHERE id = ?";

  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from cart:", err);
      return res.status(500).json({ error: "Failed to delete item" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    console.log("Removed item from cart:", id);
    res.status(200).json({ message: "Product removed from cart" });
  });
});

// Health check route
app.get("/health", (req, res) => res.json({ ok: true }));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
