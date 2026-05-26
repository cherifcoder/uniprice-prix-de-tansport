const Article = require("../models/Article");

// Afficher tous les articles
exports.getArticles = async (req, res) => {
  const articles = await Article.find();
  res.render("article", { articles });
};

// Formulaire
exports.getForm = (req, res) => {
  res.render("form");
};

// Ajouter un article
exports.addArticle = async (req, res) => {
  const { nom, categorie, prix, motsCles } = req.body;
  const keywords = motsCles ? motsCles.split(",").map(w => w.trim()) : [];
  await Article.create({ nom, categorie, prix, motsCles: keywords });
  res.redirect("/articles");
};


// Afficher tous les articles avec filtre
exports.getArticles = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.toLowerCase().trim() : "";

    let filter = {};
    if (q) {
      filter = {
        $or: [
          { nom: { $regex: q, $options: "i" } },
          { motsCles: { $regex: q, $options: "i" } }
        ]
      };
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.render("article", { articles, q });
  } catch (err) {
    console.error("Erreur lors de la récupération des articles :", err);
    res.status(500).send("Erreur serveur");
  }
};

// Afficher tous les articles avec filtres
exports.getArticles = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.toLowerCase().trim() : "";
    const categorie = req.query.categorie || "";

    let filter = {};

    if (q && categorie) {
      filter = {
        $and: [
          { categorie },
          {
            $or: [
              { nom: { $regex: q, $options: "i" } },
              { motsCles: { $regex: q, $options: "i" } }
            ]
          }
        ]
      };
    } else if (q) {
      filter = {
        $or: [
          { nom: { $regex: q, $options: "i" } },
          { motsCles: { $regex: q, $options: "i" } }
        ]
      };
    } else if (categorie) {
      filter = { categorie };
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.render("article", { articles, q, categorie });
  } catch (err) {
    console.error("Erreur lors de la récupération des articles :", err);
    res.status(500).send("Erreur serveur");
  }
};


// Formulaire d'édition
exports.getEditForm = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send("Article introuvable");
    res.render("form", { article }); // réutilise form.ejs avec données pré-remplies
  } catch (err) {
    console.error("❌ Erreur lors de la récupération de l'article :", err);
    res.status(500).send("Erreur serveur");
  }
};

// Mise à jour
exports.updateArticle = async (req, res) => {
  try {
    const { nom, categorie, prix, motsCles } = req.body;
    const keywords = motsCles
      ? motsCles.split(",").map(w => w.trim().toLowerCase()).filter(w => w.length > 0)
      : [];

    await Article.findByIdAndUpdate(req.params.id, {
      nom,
      categorie,
      prix,
      motsCles: keywords
    }, { new: true });

    res.redirect("/articles");
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour :", err);
    res.status(500).send("Erreur serveur");
  }
};

// Suppression
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/articles");
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err);
    res.status(500).send("Erreur serveur");
  }
};