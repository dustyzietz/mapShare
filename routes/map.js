const express = require('express');
const router = express.Router();

const Map = require('../models/map');

router.post('/',async (req, res) => {
  try {
    let map = await Map.findOne();
    map.players.map(player => {
     if (player._id == req.body._id) {
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

router.get('/players', async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
})

router.post('/add-player', async (req, res) => {
  const { name, url, hp, ac, attacks, spells, items } = req.body;
 try {
    const map = await Map.findOne();
   // console.log(map);
   // console.log(name, url);
   map.players = [ ...map.players, { name: name , playerUrl: url , hp, ac, attacks, spells, items, controlledPosition :{ x:1000, y:-1000 } , size: 10}];
  await  map.save();
  res.json(map.players);
  } catch (err) {
    console.log(err);
  }
})

router.delete('/player/:_id', async (req, res) => {
  try {
    const map = await Map.findOne();
    map.players = map.players.filter(
      p => p._id.toString() !== req.params._id
    );
    await map.save();
    return res.status(200).json(map.players);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/saved-players', async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedPlayers);
  } catch (err) {
    console.log(err);
  }
})

router.post('/add-saved-player', async (req, res) => {
  const { name, url, hp, ac, attacks, spells, items } = req.body;
 try {
    const map = await Map.findOne();
   //console.log(map);
    console.log(name, url);
if (map.savedPlayers.every(p => p.name !== name)){
   map.savedPlayers = [ {name , url , hp, ac, attacks, spells, items,  controlledPosition :{ x:750, y:-750 }},  ...map.savedPlayers  ];
  await  map.save(); 
  res.json(map.savedPlayers);
}
  } catch (err) {
    console.log(err);
  }
})

router.get('/map', async (req, res) => {
 try {
    const map = await Map.findOne();
   const oldMap = { name: map.mapName, url: map.mapUrl}
  res.json(oldMap);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;

router.post('/map', async (req, res) => {
  const { name, url } = req.body;
  console.log(name, url);
 try {
    const map = await Map.findOne();
    map.mapName = name;
    map.mapUrl = url;
  await  map.save(); 
  const newMap = {name: map.mapName, url: map.mapUrl}
  res.json(newMap);
  } catch (err) {
    console.log(err);
  }
})

router.post('/saved-map', async (req, res) => {
  const { name, url} = req.body;
  console.log(name, url);
 try {
    const map = await Map.findOne();
   map.savedMaps = [ {name , url },  ...map.savedMaps  ];
  await  map.save(); 
  res.json(map.savedMaps); 
  } catch (err) {
    console.log(err);
  }
})

router.get('/saved-maps', async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedMaps);
  } catch (err) {
    console.log(err);
  }
})

router.post('/size',async (req, res) => {
  try {
    let map = await Map.findOne();
    map.players.map(player => {
     if (player._id == req.body.id) {
       player.size = req.body.mySize
     }
    });
   await map.save();
    res.json(map.null);
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;