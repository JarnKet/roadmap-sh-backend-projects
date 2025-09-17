const { Router } = require("express");
const { body, param } = require("express-validator");

const { authorize } = require("../middlewares/auth.middleware");
const {
    getArticleById,
    createArticle,
    editArticle,
    deleteArticle,
    renderEditArticlePage,
    renderNewArticlePage,
} = require("../controllers/article.controller");

const articleRouter = Router();

// Validation middleware for article creation/editing
const articleValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 200 })
        .withMessage("Title must be between 3 and 200 characters"),
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long"),
    body("publishDate")
        .isISO8601()
        .withMessage("Valid publish date is required"),
];

const idValidation = [
    param("id").isUUID(4).withMessage("Invalid article ID format"),
];

// GET /articles/new - Render new article form (protected)
articleRouter.get("/new", authorize, renderNewArticlePage);

// GET /articles/:id/edit - Render edit article form (protected)
articleRouter.get("/:id/edit", authorize, idValidation, renderEditArticlePage);

// POST /articles - Create new article (protected)
articleRouter.post("/", authorize, articleValidation, createArticle);

// PUT /articles/:id - Update article by ID (protected)
articleRouter.post(
    "/:id",
    authorize,
    [...idValidation, ...articleValidation],
    editArticle
);

// DELETE /articles/:id - Delete article by ID (protected)
articleRouter.post("/delete/:id", authorize, idValidation, deleteArticle);

// GET /articles/:id - Get single article by ID (public) - MUST BE LAST
articleRouter.get("/:id", idValidation, getArticleById);

module.exports = articleRouter;
