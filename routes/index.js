import express from 'express';

var router = express.Router();

/**
 * GET home page.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware
 */
router.get('/', function (req, res, next) { res.render('index', { title: 'Home - Film Haven' }); });

export default router;