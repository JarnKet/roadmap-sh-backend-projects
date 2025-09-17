const { validationResult } = require("express-validator");
const articleService = require("../services/article.service");

/**
 * Renders the public home page with all articles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function renderPublicArticlePage(req, res) {
    try {
        const articles = await articleService.getArticlesSortedByDate();
        res.render("home", {
            articles,
            title: "Personal Blog - Latest Articles",
        });
    } catch (error) {
        console.error("Error loading articles:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Unable to load articles at this time",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

/**
 * Renders a single article page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getArticleById(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("error", {
                title: "Invalid Request",
                message: "Invalid article ID format",
                error: {},
            });
        }

        const { id } = req.params;
        const article = await articleService.getArticleById(id);

        if (!article) {
            return res.status(404).render("error", {
                title: "Article Not Found",
                message: "The requested article could not be found",
                error: {},
            });
        }

        res.render("article", {
            article,
            title: article.title,
        });
    } catch (error) {
        console.error("Error loading article:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Unable to load article at this time",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

/**
 * Renders the new article creation form
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function renderNewArticlePage(req, res) {
    res.render("admin/new", {
        title: "Create New Article",
        errors: [],
        formData: {},
    });
}

/**
 * Renders the article edit form
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function renderEditArticlePage(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("error", {
                title: "Invalid Request",
                message: "Invalid article ID format",
                error: {},
            });
        }

        const { id } = req.params;
        const article = await articleService.getArticleById(id);

        if (!article) {
            return res.status(404).render("error", {
                title: "Article Not Found",
                message: "The requested article could not be found",
                error: {},
            });
        }

        res.render("admin/edit", {
            article,
            title: "Edit Article",
            errors: [],
            formData: article,
        });
    } catch (error) {
        console.error("Error loading article for edit:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Unable to load article for editing",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

/**
 * Creates a new article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createArticle(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("admin/new", {
                title: "Create New Article",
                errors: errors.array(),
                formData: req.body,
            });
        }

        const { title, content, publishDate } = req.body;
        await articleService.createArticle({ title, content, publishDate });

        req.session.successMessage = "Article created successfully!";
        res.redirect("/admin");
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).render("admin/new", {
            title: "Create New Article",
            errors: [{ msg: "Failed to create article. Please try again." }],
            formData: req.body,
        });
    }
}

/**
 * Updates an existing article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function editArticle(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const article = await articleService.getArticleById(req.params.id);
            return res.status(400).render("admin/edit", {
                article,
                title: "Edit Article",
                errors: errors.array(),
                formData: req.body,
            });
        }

        const { id } = req.params;
        const { title, content, publishDate } = req.body;

        const updatedArticle = await articleService.updateArticle(id, {
            title,
            content,
            publishDate,
        });

        if (!updatedArticle) {
            return res.status(404).render("error", {
                title: "Article Not Found",
                message:
                    "The article you are trying to update could not be found",
                error: {},
            });
        }

        req.session.successMessage = "Article updated successfully!";
        res.redirect("/admin");
    } catch (error) {
        console.error("Error updating article:", error);
        const article = await articleService.getArticleById(req.params.id);
        res.status(500).render("admin/edit", {
            article,
            title: "Edit Article",
            errors: [{ msg: "Failed to update article. Please try again." }],
            formData: req.body,
        });
    }
}

/**
 * Deletes an article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteArticle(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errorMessage = "Invalid article ID format";
            return res.redirect("/admin");
        }

        const { id } = req.params;
        const deleted = await articleService.deleteArticle(id);

        if (!deleted) {
            req.session.errorMessage = "Article not found";
            return res.redirect("/admin");
        }

        req.session.successMessage = "Article deleted successfully!";
        res.redirect("/admin");
    } catch (error) {
        console.error("Error deleting article:", error);
        req.session.errorMessage =
            "Failed to delete article. Please try again.";
        res.redirect("/admin");
    }
}

module.exports = {
    renderPublicArticlePage,
    getArticleById,
    renderNewArticlePage,
    renderEditArticlePage,
    createArticle,
    editArticle,
    deleteArticle,
};
