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
router.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find(({
        id
    }) => id === +projectId)
    if (project) {
        res.render('projects', {
            project
        })
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;