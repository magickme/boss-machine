const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    //get an array of all minions
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('api/minions', (req, res, next) => {
    //create a new minion and save to database
    const newMinion = addToDatabase('minions', req.body);
}),
minionsRouter.get('/:minionId', (req, res, next) => {
    //get a single minion by id
    res.send(req.minion)
}),
minionsRouter.put('/:minionId', (req, res, next) => {
    //update a single minion by id
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinionInstance)
}),
minionsRouter.delete('/:minionId', (req, res, next) => {
    //delete a single minion by id
    const deleted = deleteFromDatabaseById('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})