import express from 'express';

// * ---------------------------------------------------------------- * \\
// * WEBSITE ROUTING                                                  * \\
// * Author: Aaron Augustin                                           * \\
// * ---------------------------------------------------------------- * \\

var router = express.Router();

/**
 * GET home page.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware
 */
router.get('/', function (req, res, next) { res.render('index', { title: 'Home - Film Haven' }); });

/**
 * GET prototype page.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware
 */
router.get('/prototype', function (req, res, next) { res.render('prototype/proto-homepage', { title: 'Prototype - Film Haven' }); });

export default router;