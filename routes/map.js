const express = require('express');
const router = express.Router();

const Map = require('../models/map');

router.post('/',async (req, res) => {
  try {
    let map = await Map.findOne();
    map.players.map(player => {
     if (player.name.toLowerCase() == req.body.name.toLowerCase()) {
       player.controlledPosition.x = req.body.x
       player.controlledPosition.y = req.body.y
     }
    });
   await map.save();
    res.json(map.players);
  } catch (err) {
    console.log(err)
  }
});

router.get('/', async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.players);
console.log(map.players);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;