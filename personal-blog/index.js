const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

// Middleware imports
const { setViewVariables } = require("./middlewares/auth.middleware");

// Route imports
const adminRouter = require("./routes/admin.route");
const articleRouter = require("./routes/article.route");

// Controller imports
const { renderPublicArticlePage } = require("./controllers/article.controller");

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy if behind reverse proxy (for production)
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files middleware
app.use("/public", express.static(path.join(__dirname, "public")));

// Body parsing middleware
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// Method override middleware for PUT and DELETE requests
app.use(methodOverride("_method"));

// Debug middleware to log method override
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        if (req.body && req.body._method) {
            console.log(
                `Method override: ${req.method} -> ${req.body._method} for ${req.path}`
            );
        }
        next();
    });
}

// Session configuration
app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            "development-secret-change-in-production",
        resave: false,
        saveUninitialized: false,
        // rolling: true, // Reset maxAge on every request
        name: "blog-session",
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "lax", // Changed from strict to lax for better compatibility
        },
    })
);

// Global middleware
app.use(setViewVariables);

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});

// Request logging in development
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// Routes
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", renderPublicArticlePage);

// Mount routers
app.use("/admin", adminRouter);
app.use("/articles", articleRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).render("error", {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        error: {},
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);

    res.status(error.status || 500).render("error", {
        title: "Something went wrong",
        message:
            process.env.NODE_ENV === "production"
                ? "An unexpected error occurred."
                : error.message,
        error: process.env.NODE_ENV === "development" ? error : {},
    });
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down gracefully...");
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Personal Blog server running on http://localhost:${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});
