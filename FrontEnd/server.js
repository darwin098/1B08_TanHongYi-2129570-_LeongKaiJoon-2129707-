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

app.get("/allProducts/", (req, res) => {
  res.sendFile("/public/allProducts.html", { root: __dirname });
});

app.get("/signIn/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/signUp/", (req, res) => {
  res.sendFile("/public/signUp.html", { root: __dirname });
});

// -------------------------------------------------------------
// Config
// -------------------------------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
