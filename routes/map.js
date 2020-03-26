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
  } catch (err) {
    console.log(err);
  }
})

router.post('/add-player', async (req, res) => {
  const { name, url } = req.body;
 try {
    const map = await Map.findOne();
   // console.log(map);
   // console.log(name, url);
if (map.players.every(p => p.name !== name)){
   map.players = [ ...map.players, { name: name , playerUrl: url , controlledPosition :{ x:750, y:-750 } }];
  await  map.save();
  console.log(map);
}
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;