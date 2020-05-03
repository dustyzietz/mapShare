const express = require("express");
const mongoose = require("mongoose");
const Map = require("./models/map");
const app = express();
const path = require("path");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/users";
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(
     //  CONNECTION_URI,
      "mongodb+srv://dzietz:kqQIl8PlTEV2SEfh@cluster0-uvrcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("mongo connected!");
    const map = await Map.findOne();
    if (!map) {
      const map = await new Map({
        mapName: "Default Map",
        mapUrl:
          "https://i.pinimg.com/736x/9f/ec/db/9fecdba47cfcda751e4eadce08ff95a7.jpg",
        players: [],
        savedPlayers: []
      });
      await map.save();
    }
    // console.log(map);
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

connectDB();

app.use(express.json({ extended: false }));

app.use("/map", require("./routes/map"));

// Serve static assets in production 
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (rep, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const io = require('./client/src/socket').init(server);
io.on('connection', socket => {
  console.log('Client connected');
});