const { validationResult } = require("express-validator");
const articleService = require("../services/article.service");

/**
 * Handle admin login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function login(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("admin/index", {
                isLoggedIn: false,
                data: [],
                errors: errors.array(),
                successMessage: null,
                errorMessage: "Please provide a valid passphrase",
            });
        }

        const { passphrase } = req.body;

        // For demonstration purposes - in production, use proper authentication
        // Consider using bcrypt for password hashing and environment variables for credentials
        if (
            passphrase === process.env.ADMIN_PASSPHRASE ||
            passphrase === "ADMIN"
        ) {
            req.session.isAdmin = true;
            req.session.loginTime = new Date().toISOString();

            req.session.successMessage = "Successfully logged in!";
            res.redirect("/admin");
        } else {
            res.status(401).render("admin/index", {
                isLoggedIn: false,
                data: [],
                errors: [],
                successMessage: null,
                errorMessage: "Invalid credentials. Please try again.",
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).render("admin/index", {
            isLoggedIn: false,
            data: [],
            errors: [],
            successMessage: null,
            errorMessage: "An error occurred during login. Please try again.",
        });
    }
}

/**
 * Render admin dashboard page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function renderAdminPage(req, res) {
    try {
        if (req.session && req.session.isAdmin) {
            // User is logged in - show admin dashboard
            const articles = await articleService.getArticlesSortedByDate();

            // Get flash messages from session
            const successMessage = req.session.successMessage || null;
            const errorMessage = req.session.errorMessage || null;

            // Clear flash messages from session
            req.session.successMessage = null;
            req.session.errorMessage = null;

            res.render("admin/index", {
                isLoggedIn: true,
                data: articles,
                errors: [],
                successMessage,
                errorMessage,
                title: "Admin Dashboard",
                loginTime: req.session.loginTime,
            });
        } else {
            // User is not logged in - show login form
            res.render("admin/index", {
                isLoggedIn: false,
                data: [],
                errors: [],
                successMessage: null,
                errorMessage: null,
                title: "Admin Login",
            });
        }
    } catch (error) {
        console.error("Error rendering admin page:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Unable to load admin page at this time",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

/**
 * Handle admin logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function logout(req, res) {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error during logout:", err);
                return res.status(500).render("error", {
                    title: "Error",
                    message: "Error occurred during logout",
                    error: process.env.NODE_ENV === "development" ? err : {},
                });
            }

            // Redirect to admin page (will show login form)
            res.redirect("/admin");
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Error occurred during logout",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

module.exports = {
    login,
    renderAdminPage,
    logout,
};
