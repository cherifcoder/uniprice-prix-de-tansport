const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.getArticles);
router.get("/new", articleController.getForm);
router.post("/new", articleController.addArticle);

// Modification
router.get("/edit/:id", articleController.getEditForm);
router.post("/edit/:id", articleController.updateArticle);

// Suppression
router.post("/delete/:id", articleController.deleteArticle);

module.exports = router;
