const express = require("express");
const mongoose = require("mongoose");
const Map = require("./models/map");
const app = express();
const path = require("path");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://dusty:Falcore1!@cluster0.zpjo6.mongodb.net/test"
//"mongodb+srv://dusty:aAFTdImMc95X1Tan@cluster0.zpjo6.mongodb.net/test?authSource=admin&replicaSet=atlas-fokr1z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(
       CONNECTION_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("mongo connected!");
    const map = await Map.findOne();
    if (!map) {
      const map = await new Map({
        mapName: "Default Map",
        mapUrl:
          "https://slyflourish.com/images/menzer_dyson_map.jpg",
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
app.use("/upload", require("./routes/upload"));

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