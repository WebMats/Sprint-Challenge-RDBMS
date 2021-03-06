const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');


router.post('', async (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(404).json({errorMessage: "Please provide both a name and description field"});
    }
    try {
        const completed = req.body.completed === true ? 1 : 0;
        const [id] = await db('projects').insert({name, description, completed});
        res.status(201).json({id})
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create the new project."})
    }
})


router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const fetchedProject = await db('projects').where({id}).first();
        console.log(fetchedProject)
        const actionsArray = await db('actions').where({project_id: id})
        const transformedActions = actionsArray.map(action => ({...action, completed: action.completed === 1 ? true : false }))
        const project = {...fetchedProject, completed: fetchedProject.completed === 1 ? true: false, actions: transformedActions}
        if (!project.name) {
            return res.status(404).json({errorMessage: `Could not find the project with an id of ${id}.`})
        }
        res.status(200).json(project)
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch the project."})
    }
})

router.put('/:id', async (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(404).json({errorMessage: "Please provide both a name and description field"});
    }
    try {
        const completed = req.body.completed === true ? 1 : 0;
        const result = await db('projects').where({id: req.params.id}).update({name , description, completed})
        if (!result) {
            res.status(404).json({errorMessage: "Could not update the project."})
        } else {
            res.status(201).json(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not update the project."})
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db('projects').where({id: req.params.id}).del();
        if (result < 1) {
            res.status(404).json({errorMessage: "The project with that id could not be deleted"})
          } else {
            res.status(201).json(result)
          }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not delete the project"})
    }
})



module.exports = router