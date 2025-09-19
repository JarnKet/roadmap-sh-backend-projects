const {Router} = require('express');

// Local Imports
const {
    shortenUrl,
    getShortenedUrl,
    getShortenedUrlStat,
    deleteShortenedUrl,
    updateShortenedUrl
} = require('../controller/shorten.controller');


const shortenRouter = Router();


shortenRouter.route('/')
    .post(shortenUrl)

shortenRouter.route('/:shortCode')
    .get(getShortenedUrl)
    .put(updateShortenedUrl)
    .delete(deleteShortenedUrl)

shortenRouter.route('/:shortCode/stats')
    .get(getShortenedUrlStat)

module.exports = shortenRouter;