const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');


router.post('', async (req, res, next) => {
    const { notes, description, project_id } = req.body;
    if (!description || !project_id) {
        return res.status(404).json({errorMessage: "Please provide both a description field and a project_id field"});
    }
    try {
        const completed = req.body.completed === true ? 1 : 0;
        const [id] = await db('actions').insert({notes, description, completed, project_id});
        res.status(201).json({id})
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create the new action."})
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const fetchedAction = await db('actions').where({id}).first();
        if (!fetchedAction) {
            return res.status(404).json({errorMessage: `Could not find the action with an id of ${id}.`})
        }
        const contexts = await db('action_contexts').where({action_id: id}).join('contexts', {'contexts.id':'action_contexts.context_id'})
        const transFormedContexts = contexts.map(context => ({context: context.context}));
        const transformedAction = {...fetchedAction, completed: fetchedAction === 1 ? true : false, contexts: transFormedContexts}
        res.status(200).json(transformedAction)
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch the project."})
    }
})

router.put('/:id', async (req, res, next) => {
    const { notes, description, project_id } = req.body;
    if (!description || !project_id) {
        return res.status(404).json({errorMessage: "Please provide both a description field and a project_id field"});
    }
    try {
        const completed = req.body.completed === true ? 1 : 0;
        const result = await db('actions').where({id: req.params.id}).update({notes , description, completed, project_id})
        if (!result) {
            res.status(404).json({errorMessage: "Could not update the action."})
        } else {
            res.status(201).json(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not update the action."})
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db('actions').where({id: req.params.id}).del();
        if (result < 1) {
            res.status(404).json({errorMessage: "The action with that id could not be deleted"})
          } else {
            res.status(201).json(result)
          }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not delete the action"})
    }
})




module.exports = router