const express = require('express');
const app = express();
const path = require('path')
var indexRouter = require('./routes/index');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: false
})) // for parsing application/x-www-form-urlencoded

//setting the view engine to pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

//serves static files located in public folder
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(indexRouter);

//error handling
app.use((req, res, next) => {
    const error = new Error('Pump your brakes! Page Not Found!');
    error.status = 404;
    console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
    next(error)
})
app.use((error, req, res, next) => {
    res.locals.error = error
    res.status(error.status ||' Not Found')
    res.render('error')
})

//setting the port to 3000 
app.listen(3000, () => {
    console.log('Ths app is running on localhost: 3000')
})