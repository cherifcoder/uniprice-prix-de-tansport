require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Connexion à la Base de données
connectDB();

// configuration des vues (Version robuste pour Vercel - UNIQUE)
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ─── ROUTES ──────────────────────────────────────────────────────────

// Point d'entrée : redirection automatique de la racine vers /articles
app.get("/", (req, res) => {
  res.redirect("/articles");
});

// Tes routes d'articles
app.use("/articles", articleRoutes);

// ─────────────────────────────────────────────────────────────────────

// ✅ En local : démarrer le serveur
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 7000; // Mis sur 7000 pour correspondre à tes tests
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ Sur Vercel : exporter l’app
module.exports = app;