const express = require('express');
const router = express.Router();

const Game = require('../db').model('game');

router.get('/games', (req, res, next) => {
  Game.findAll()
  .then(games => res.json(games))
  .catch(next);
});

router.post('/games', (req, res, next) => {
  Game.create(req.body)
  .then(game => res.status(201).json(game))
  .catch(next);
});

module.exports = router;
