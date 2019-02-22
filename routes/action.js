const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');


router.post('', async (req, res, next) => {
    const { notes, description, project_id } = req.body;
    if (!description || !project_id) {
        return res.status(404).json({errorMessage: "Please provide both a description field and a project_id field"});
    }
    try {
        const completed = req.body.completed ? req.body.completed : false;
        const [id] = await db('actions').insert({notes, description, completed, project_id});
        res.status(201).json({id})
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create the new action."})
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const action = await db('actions').where({id: req.params.id}).first();
        if (!action) {
            return res.status(404).json({errorMessage: `Could not find the action with an id of ${req.params.id}.`})
        }
        res.status(200).json(action)
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch the project."})
    }
})





module.exports = router