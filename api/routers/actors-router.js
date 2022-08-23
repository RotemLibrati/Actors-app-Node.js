const express = require('express');
const router = express.Router();

const { getActors } = require('../controllers/actors-conrollers');

router.get('/', getActors);

module.exports = router;