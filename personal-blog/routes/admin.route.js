const { Router } = require("express");
const { body } = require("express-validator");

const {
    login,
    logout,
    renderAdminPage,
} = require("../controllers/admin.controller");
const { authorize } = require("../middlewares/auth.middleware");

const adminRouter = Router();

// GET /admin - Render admin dashboard or login page
adminRouter.get("/", renderAdminPage);

// POST /admin/login - Handle admin login with validation
adminRouter.post(
    "/login",
    [
        body("passphrase")
            .notEmpty()
            .withMessage("Passphrase is required")
            .isLength({ min: 1 })
            .withMessage("Passphrase cannot be empty"),
    ],
    login
);

// POST /admin/logout - Handle admin logout (protected route)
adminRouter.post("/logout", authorize, logout);

module.exports = adminRouter;
