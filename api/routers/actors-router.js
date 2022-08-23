const express = require('express');
const router = express.Router();

const { getActors, writeComment, deleteActor } = require('../controllers/actors-conrollers');

router.get('/', getActors);
router.post('/', writeComment);
router.delete('/', deleteActor);

module.exports = router;