require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
// const dns = require("dns");
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

// DB
connectDB();

// Définition robuste des chemins pour Vercel
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/articles", articleRoutes);

// ✅ En local : démarrer le serveur
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}
// Route de test pour vérifier que le serveur répond sur la racine
app.get("/", (req, res) => {
  res.redirect("/articles");
});
module.exports = app;
