/**
 * Authentication middleware
 * Checks if user is authenticated as admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function authorize(req, res, next) {
    try {
        // Check if session exists and user is authenticated
        const isAdmin = req.session && req.session.isAdmin;

        if (isAdmin) {
            // User is authenticated and session is valid
            // The session expiration is handled by express-session cookie maxAge
            next();
        } else {
            // User is not authenticated
            res.status(403).render("error", {
                title: "Access Denied",
                message:
                    "You must be logged in as an administrator to access this resource.",
                error: {},
            });
        }
    } catch (error) {
        console.error("Error in authorization middleware:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "An error occurred while checking authentication.",
            error: process.env.NODE_ENV === "development" ? error : {},
        });
    }
}

/**
 * Optional middleware to redirect authenticated users away from login page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function redirectIfAuthenticated(req, res, next) {
    try {
        const isAdmin = req.session && req.session.isAdmin;

        if (isAdmin) {
            // User is already logged in, redirect to admin dashboard
            return res.redirect("/admin");
        }

        // User is not logged in, continue to login page
        next();
    } catch (error) {
        console.error("Error in redirect middleware:", error);
        next(); // Continue to login page on error
    }
}

/**
 * Middleware to set common variables for all views
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function setViewVariables(req, res, next) {
    try {
        // Set common variables available in all views
        res.locals.isAdmin = req.session && req.session.isAdmin;
        res.locals.currentYear = new Date().getFullYear();
        res.locals.siteName = "Personal Blog";

        next();
    } catch (error) {
        console.error("Error in view variables middleware:", error);
        next(); // Continue despite error
    }
}

module.exports = {
    authorize,
    redirectIfAuthenticated,
    setViewVariables,
};
