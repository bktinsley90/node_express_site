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
    const err = new Error('Pump your brakes! Page Not Found!');
    err.status = 404;
    next(err)
})
app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    res.render('error', err)
})

//setting the port to 3000 
app.listen(3000, () => {
    console.log('Ths app is running on localhost: 3000')
})