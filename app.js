require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 6000;
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// DB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
