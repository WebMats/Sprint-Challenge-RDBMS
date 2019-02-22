const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');


router.post('', async (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(404).json({errorMessage: "Please provide both a name and description field"});
    }
    try {
        const completed = req.body.completed ? req.body.completed : false;
        const [id] = await db('projects').insert({name, description, completed});
        res.status(201).json({id})
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create the new project."})
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        const project = await db('projects').where({id: req.params.id}).first();
        if (!project) {
            return res.status(404).json({errorMessage: `Could not find the project with an id of ${req.params.id}.`})
        }
        res.status(200).json(project)
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch the project."})
    }
})




module.exports = router