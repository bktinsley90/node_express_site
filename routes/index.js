const express = require('express');
const router = express.Router();
const data = require('../data.json')
const projects = data.projects


router.get('/', (req, res, next) => {
    res.render('index', {
        projects
    })
})

router.get('/about', (req, res) => {
    res.render("about")
})
router.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({
        id
    }) => id === +projectId)
    if (project) {
        res.render('projects', {
            project
        })
    } else {
        const error = new Error('Pump your brakes! Project Not Found!');
          error.status = 404;
        console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
        next(error)
    }
})

module.exports = router;