const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const articlesFilePath = path.join(__dirname, "../data/articles.json");

/**
 * Article Service - Handles all article data operations
 * Separates business logic from controllers
 */
class ArticleService {
    /**
     * Reads articles from JSON file
     * @returns {Promise<Array>} Array of articles
     */
    async getAllArticles() {
        try {
            const articlesData = await fs.readFile(articlesFilePath, "utf-8");
            return articlesData.trim() ? JSON.parse(articlesData) : [];
        } catch (error) {
            if (error.code === "ENOENT") {
                // File doesn't exist, return empty array
                return [];
            }
            throw new Error(`Failed to read articles: ${error.message}`);
        }
    }

    /**
     * Finds an article by ID
     * @param {string} id - Article ID
     * @returns {Promise<Object|null>} Article object or null if not found
     */
    async getArticleById(id) {
        const articles = await this.getAllArticles();
        return articles.find((article) => article.id === id) || null;
    }

    /**
     * Creates a new article
     * @param {Object} articleData - Article data
     * @returns {Promise<Object>} Created article
     */
    async createArticle(articleData) {
        const { title, content, publishDate } = articleData;

        const newArticle = {
            id: uuidv4(),
            title: title.trim(),
            content: content.trim(),
            publishDate,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const articles = await this.getAllArticles();
        articles.push(newArticle);

        await this.saveArticles(articles);
        return newArticle;
    }

    /**
     * Updates an existing article
     * @param {string} id - Article ID
     * @param {Object} updateData - Updated article data
     * @returns {Promise<Object|null>} Updated article or null if not found
     */
    async updateArticle(id, updateData) {
        const articles = await this.getAllArticles();
        const articleIndex = articles.findIndex((article) => article.id === id);

        if (articleIndex === -1) {
            return null;
        }

        const { title, content, publishDate } = updateData;
        articles[articleIndex] = {
            ...articles[articleIndex],
            title: title.trim(),
            content: content.trim(),
            publishDate,
            updatedAt: new Date().toISOString(),
        };

        await this.saveArticles(articles);
        return articles[articleIndex];
    }

    /**
     * Deletes an article by ID
     * @param {string} id - Article ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async deleteArticle(id) {
        const articles = await this.getAllArticles();
        const initialLength = articles.length;
        const filteredArticles = articles.filter(
            (article) => article.id !== id
        );

        if (filteredArticles.length === initialLength) {
            return false; // Article not found
        }

        await this.saveArticles(filteredArticles);
        return true;
    }

    /**
     * Saves articles array to JSON file
     * @param {Array} articles - Articles array
     * @returns {Promise<void>}
     */
    async saveArticles(articles) {
        try {
            // Ensure data directory exists
            await fs.mkdir(path.dirname(articlesFilePath), { recursive: true });
            await fs.writeFile(
                articlesFilePath,
                JSON.stringify(articles, null, 2)
            );
        } catch (error) {
            throw new Error(`Failed to save articles: ${error.message}`);
        }
    }

    /**
     * Get articles sorted by publish date (newest first)
     * @returns {Promise<Array>} Sorted articles array
     */
    async getArticlesSortedByDate() {
        const articles = await this.getAllArticles();
        return articles.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
    }
}

module.exports = new ArticleService();
