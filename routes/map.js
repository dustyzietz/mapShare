const express = require('express');
const router = express.Router();
const io = require('../client/src/socket');

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
  io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err)
  }
});

router.post('/messages', (req, res) => {
  const {message, chatName} = req.body;

  io.getIO().emit('maps', { action: 'message', newMessage: {message, chatName} });
    res.json({message, chatName});
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
  const { name, url, hp, ac, speed, attacks, spells, skills, items, saves, abilities } = req.body;
 try {
    const map = await Map.findOne();
   // console.log(map);
   // console.log(name, url);
   map.players = [ ...map.players, { name: name , playerUrl: url , hp, ac, speed, currentHp: hp, attacks, spells, skills, items, saves, abilities,  controlledPosition :{ x:600, y:-800 } , size: 10}];
  await  map.save();
  io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
  res.json(map.players);
  } catch (err) {
    console.log(err);
  }
})

router.post('/edit-player', async (req, res) => {
  const newPlayer = req.body;
 try {
    const map = await Map.findOne();
  //  console.log(newPlayer._id)
  const editedIndex = map.players.findIndex(p => p._id.toString() === newPlayer._id);
map.players[editedIndex] = newPlayer;
  // map.players = [ ...map.players, newPlayer ];
  await  map.save();
  io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
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
    io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
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

router.post('/edit-saved-player', async (req, res) => {
  const newPlayer = req.body;
 try {
    const map = await Map.findOne();
  //  console.log(newPlayer._id)
  map.savedPlayers = map.savedPlayers.filter(p => p.name !== newPlayer.name);
  map.savedPlayers = [ {  controlledPosition :{ x:750, y:-750 } , url: newPlayer.playerUrl, ...newPlayer },  ...map.savedPlayers  ];
  await  map.save();
  res.json(map.savedPlayers);
  } catch (err) {
    console.log(err);
  }
})

router.post('/add-saved-player', async (req, res) => {
  const player = req.body;
  console.log(player);
 try {
    const map = await Map.findOne();
  
if (map.savedPlayers.every(p => p.name !== player.name)){
   map.savedPlayers = [ {  controlledPosition :{ x:500, y:-1000 } , ...player },  ...map.savedPlayers  ];
  await  map.save(); 
  res.json(map.savedPlayers);
}
  } catch (err) {
    console.log(err);
  }
})

router.delete('/saved-player/:_id', async (req, res) => {
  try {
    const map = await Map.findOne();
    map.savedPlayers = map.savedPlayers.filter(
      p => p._id.toString() !== req.params._id
    );
    await map.save();
    return res.status(200).json(map.savedPlayers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/saved-monsters', async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedMonsters);
  } catch (err) {
    console.log(err);
  }
})

router.post('/add-saved-monster', async (req, res) => {
  const monster = req.body;
  console.log(monster);
 try {
    const map = await Map.findOne();
  
if (map.savedMonsters.every(m => m.name !== monster.name)){
   map.savedMonsters = [ {  controlledPosition :{ x:500, y:-1000 } , ...monster },  ...map.savedMonsters  ];
  await  map.save(); 
  res.json(map.savedMonsters);
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



router.post('/map', async (req, res) => {
  const { name, url } = req.body;
  console.log(name, url);
 try {
    const map = await Map.findOne();
    map.mapName = name;
    map.mapUrl = url;
  await  map.save(); 
  const newMap = {name: map.mapName, url: map.mapUrl};
  io.getIO().emit('maps', { action: 'create', newMap: newMap });
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
   io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err)
  }
});

router.post('/hit-points',async (req, res) => {

 console.log(req.body)
   io.getIO().emit('maps', { action: 'hit points', newHitPoints: req.body });
    res.json(null);
 
});

router.post('/edit-all-players', async (req, res) => {
  const newPlayers = req.body;
 try {
    const map = await Map.findOne();
 map.players = newPlayers;
  await  map.save();
  io.getIO().emit('maps', { action: 'players', newPlayers: map.players });
  res.json(map.players);
  } catch (err) {
    console.log(err);
  }
})



module.exports = router;