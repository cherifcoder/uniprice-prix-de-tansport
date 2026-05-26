const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: { type: String, required: true },
  prix: { type: Number, required: true },
  motsCles: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
