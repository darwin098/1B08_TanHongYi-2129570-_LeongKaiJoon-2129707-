// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const express = require("express");
const app = express();

// -------------------------------------------------------------
// Endpoints
// -------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/promotions/", (req, res) => {
  res.sendFile("/public/promotions.html", { root: __dirname });
});

app.get("/search/", (req, res) => {
  res.sendFile("/public/search.html", { root: __dirname });
});

app.get("/product/:pid", (req, res) => {
  res.sendFile("/public/individualProduct.html", { root: __dirname });
});

app.get("/editProfile/", (req, res) => {
  res.sendFile("/public/editProfile.html", { root: __dirname });
});

app.get("/products/edit/:pid", (req, res) => {
  res.sendFile("/public/editProduct.html", { root: __dirname });
});

app.get("/signIn/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/individualPage/", (req, res) => {
  res.sendFile("/public/individualProduct.html", { root: __dirname });
});

app.get("/register/", (req, res) => {
  res.sendFile("/public/signUp.html", { root: __dirname });
});

app.get("/tmp/", (req, res) => {
  res.sendFile("/public/addProductPage.html", { root: __dirname });
});

// -------------------------------------------------------------
// Config
// -------------------------------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
