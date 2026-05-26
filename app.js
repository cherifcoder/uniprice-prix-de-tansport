require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// DB
connectDB();

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

// ✅ Sur Vercel : exporter l’app
module.exports = app;
