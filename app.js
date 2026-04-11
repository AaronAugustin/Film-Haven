import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';

var app = express();

// view engine setup.
app.set('views', path.join('./views'));
app.set('view engine', 'ejs');

// Middleware setup.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('./public')));

// Routes setup.
app.use('/', indexRouter);

/**
 * Catch 404 and forward to error handler.
 * @param {*} req - Request 404
 * @param {*} res - Respond to 404 error
 * @param {*} next - Next middleware
 */
app.use(function (req, res, next) { next(createError(404)); });

/**
 * Handle incoming errors.
 * @param {*} err - Error object
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 */
app.use(function (err, req, res, next) {
     // set locals, only providing error in development.
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page.
     res.status(err.status || 500);
     res.render('error');
});

export default app;