// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const express = require("express");
const app = express();

// -------------------------------------------------------------
// Endpoints
// -------------------------------------------------------------

// -------------------------------------------------------------
// Pages for general public
// -------------------------------------------------------------

// Home page (required)
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

// Sign-up page (required)
app.get("/register/", (req, res) => {
  res.sendFile("/public/signUp.html", { root: __dirname });
});

// Sign-in page (required)
app.get("/signIn/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

// Search page (required)
app.get("/search/", (req, res) => {
  res.sendFile("/public/search.html", { root: __dirname });
});

// product page (required)
app.get("/product/:pid", (req, res) => {
  res.sendFile("/public/individualProduct.html", { root: __dirname });
});

// promotions page (additional)
app.get("/promotions/", (req, res) => {
  res.sendFile("/public/promotions.html", { root: __dirname });
});

// -------------------------------------------------------------
// Pages for users and admins only
// -------------------------------------------------------------

// Edit profile page (additional)
app.get("/editProfile/", (req, res) => {
  res.sendFile("/public/editProfile.html", { root: __dirname });
});

// -------------------------------------------------------------
// Pages for admin only
// -------------------------------------------------------------

// Add category page (required)
app.get("/categories/add", (req, res) => {
  res.sendFile("/public/addCategory.html", { root: __dirname });
});

// Add product page (required)
app.get("/tmp/", (req, res) => {
  res.sendFile("/public/addProductPage.html", { root: __dirname });
});

// Edit product page (additional)
app.get("/products/edit/:pid", (req, res) => {
  res.sendFile("/public/editProduct.html", { root: __dirname });
});

// -------------------------------------------------------------
// Config
// -------------------------------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
