const express = require("express");
const router = express.Router();
const io = require("../client/src/socket");
const { uuid } = require("uuidv4");
const Map = require("../models/map");

router.post("/", async (req, res) => {
  try {
    let map = await Map.findOne();
    map.players.map((player) => {
      if (player.playerId == req.body.playerId) {
        player.controlledPosition.x = req.body.x;
        player.controlledPosition.y = req.body.y;
      }
    });
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.post("/messages", (req, res) => {
  const { message, chatName } = req.body;

  io.getIO().emit("maps", {
    action: "message",
    newMessage: { message, chatName },
  });
  res.json({ message, chatName });
});

router.post("/alerts", (req, res) => {
  const { msg, alertType, timeout } = req.body;

  io.getIO().emit("maps", {
    action: "alert",
    newAlert: { msg, alertType, timeout },
  });
  res.json(null);
});

router.get("/players", async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-player", async (req, res) => {
  try {
    const map = await Map.findOne();
    map.players = [
      ...map.players,
      {
        ...req.body,
        controlledPosition: { x: 600, y: -800 },
        playerId: uuid(),
        size: 10,
        currentHp: req.body.hp,
      },
    ];
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit-player", async (req, res) => {
  const newPlayer = req.body;
  try {
    const map = await Map.findOne();
    const editedIndex = map.players.findIndex(
      (p) => p.playerId.toString() === newPlayer.playerId
    );
    map.players[editedIndex] = newPlayer;
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/player/:playerId", async (req, res) => {
  try {
    const map = await Map.findOne();
    map.players = map.players.filter((p) => p.playerId !== req.params.playerId);
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    return res.status(200).json(map.players);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/saved-players", async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedPlayers);
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit-saved-player", async (req, res) => {
  console.log(req.body);
  const newPlayer = req.body;
  try {
    const map = await Map.findOne();
    //  console.log(newPlayer._id)
    map.savedPlayers = map.savedPlayers.filter(
      (p) => p.name !== newPlayer.name
    );
    map.savedPlayers = [
      { controlledPosition: { x: 750, y: -750 }, ...newPlayer },
      ...map.savedPlayers,
    ];
    await map.save();
    res.json(map.savedPlayers);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-saved-player", async (req, res) => {
  const player = req.body;
  try {
    const map = await Map.findOne();

    if (map.savedPlayers.every((p) => p.name !== player.name)) {
      map.savedPlayers = [
        { controlledPosition: { x: 500, y: -1000 }, ...player },
        ...map.savedPlayers,
      ];
      await map.save();
      res.json(map.savedPlayers);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/saved-player/:_id", async (req, res) => {
  try {
    const map = await Map.findOne();
    map.savedPlayers = map.savedPlayers.filter(
      (p) => p._id.toString() !== req.params._id
    );
    await map.save();
    return res.status(200).json(map.savedPlayers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/saved-monsters", async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedMonsters);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-saved-monster", async (req, res) => {
  const monster = req.body;
  console.log(monster);
  try {
    const map = await Map.findOne();

    if (map.savedMonsters.every((m) => m.name !== monster.name)) {
      map.savedMonsters = [
        { controlledPosition: { x: 500, y: -1000 }, ...monster },
        ...map.savedMonsters,
      ];
      await map.save();
      res.json(map.savedMonsters);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/map", async (req, res) => {
  try {
    const map = await Map.findOne();
    const oldMap = { name: map.mapName, url: map.mapUrl };
    res.json(oldMap);
  } catch (err) {
    console.log(err);
  }
});

router.post("/map", async (req, res) => {
  const { name, url } = req.body;
  console.log(name, url);
  try {
    const map = await Map.findOne();
    map.mapName = name;
    map.mapUrl = url;
    await map.save();
    const newMap = { name: map.mapName, url: map.mapUrl };
    io.getIO().emit("maps", { action: "create", newMap: newMap });
    res.json(newMap);
  } catch (err) {
    console.log(err);
  }
});

router.post("/saved-map", async (req, res) => {
  const { name, url } = req.body;
  console.log(name, url);
  try {
    const map = await Map.findOne();
    map.savedMaps = [{ name, url }, ...map.savedMaps];
    await map.save();
    res.json(map.savedMaps);
  } catch (err) {
    console.log(err);
  }
});

router.get("/saved-maps", async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedMaps);
  } catch (err) {
    console.log(err);
  }
});

router.post("/size", async (req, res) => {
  try {
    let map = await Map.findOne();
    map.players.map((player) => {
      if (player.playerId == req.body.id) {
        player.size = req.body.mySize;
      }
    });
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.post("/hit-points", async (req, res) => {
  console.log(req.body);
  io.getIO().emit("maps", { action: "hit points", newHitPoints: req.body });
  res.json(null);
});

router.post("/edit-all-players", async (req, res) => {
  const newPlayers = req.body;
  try {
    const map = await Map.findOne();
    map.players = newPlayers;
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-saved-event", async (req, res) => {
  const event = req.body;
  try {
    const map = await Map.findOne();
    map.savedEvents = [event, ...map.savedEvents];
    await map.save();
    res.json(map.savedEvents);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/saved-map/:id", async (req, res) => {
  try {
    const map = await Map.findOne();
    map.savedMaps = map.savedMaps.filter(
      (m) => m._id.toString() !== req.params.id.toString()
    );
    await map.save();
    res.json(map.savedMaps);
  } catch (error) {
    console.error(error);
  }
});

router.get("/get-saved-events", async (req, res) => {
  try {
    const map = await Map.findOne();
    res.json(map.savedEvents);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-event", async (req, res) => {
  const { event, mapName } = req.body;
  try {
    const map = await Map.findOne();
    let currentMap = map.savedMaps.find((m) => m.name === mapName);
    currentMap.events = [
      {
        ...event,
        controlledPosition: { x: 500, y: -1000 },
        stage: 0,
        eventId: uuid(),
      },
      ...currentMap.events,
    ];
    await map.save();
    io.getIO().emit("maps", { action: "events", newEvents: currentMap.events });
    res.json(null);
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit-event", async (req, res) => {
  const { event, mapName } = req.body;
  try {
    const map = await Map.findOne();
    let mapIndex = map.savedMaps.findIndex(
      (m) => m.name === mapName
    );
    console.log(mapIndex)
    map.savedMaps[mapIndex].events =  map.savedMaps[mapIndex].events.filter(
      (e) => e.eventId !== event.eventId
    );
    map.savedMaps[mapIndex].events = [event, ...map.savedMaps[mapIndex].events];
    await map.save();
    io.getIO().emit("maps", { action: "events", newEvents: [...map.savedMaps[mapIndex].events] });
    res.json(null);
  } catch (err) {
    console.log(err);
  }
});

router.post("/get-events", async (req, res) => {
  const { mapName } = req.body;
  try {
    const map = await Map.findOne();
    let currentMap = map.savedMaps.find((m) => m.name === mapName);
    let currentEvents = currentMap.events;
    await map.save();
    res.json(currentEvents);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/event/:eventId/:mapName", async (req, res) => {
  try {
    const map = await Map.findOne();
    let mapIndex = map.savedMaps.findIndex(
      (m) => m.name === req.params.mapName
    );
    console.log(mapIndex);
    map.savedMaps[mapIndex].events = map.savedMaps[mapIndex].events.filter(
      (e) => e.eventId !== req.params.eventId
    );
    await map.save();
    io.getIO().emit("maps", {
      action: "events",
      newEvents: map.savedMaps[mapIndex].events,
    });
    res.json(null);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/saved-event/:id", async (req, res) => {
  try {
    const map = await Map.findOne();
    map.savedEvents = map.savedEvents.filter(
      (e) => e._id.toString() !== req.params.id.toString()
    );
    await map.save();
    res.json(map.savedEvents);
  } catch (error) {
    console.error(error);
  }
});

router.post("/add-monsters", async (req, res) => {
  console.log("fired")
  const{name, qty} = req.body
  try {
    const map = await Map.findOne();
    let monster = map.savedPlayers.find(p =>  p.name.toLowerCase() === name.toLowerCase())
    monster =  {
      ...monster._doc,
      controlledPosition: { x: 600, y: -800 },
      size: 10,
      currentHp: monster.hp,
    }
    let monsters = []
     for (let i = 0; i < qty ; i++){monsters[i] = {...monster, playerId: uuid(),}}
    
    map.players = [
      ...map.players,
     ...monsters
    ];
    await map.save();
    io.getIO().emit("maps", { action: "players", newPlayers: map.players });
    res.json(map.players);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
