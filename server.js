const express = require('express');
const mongoose = require('mongoose');
const Map = require('./models/map');
const app = express();


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://dzietz:kqQIl8PlTEV2SEfh@cluster0-uvrcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    { useNewUrlParser: true });
    console.log('mongo connected!');
   const map = await Map.findOne();
    if(!map){
      const map = await new Map({
        mapName: 'Default Map',
        mapUrl: 'https://i.pinimg.com/736x/9f/ec/db/9fecdba47cfcda751e4eadce08ff95a7.jpg',
        players: [
          {name: 'Dusty',
           playerUrl: 'https://i.ya-webdesign.com/images/dd-fighter-png-2.png',
           controlledPosition: { x: 100, y: 100} },
           {
             name: 'Roan',
             playerUrl: 'https://cdna.artstation.com/p/assets/images/images/013/185/354/medium/john-paul-balmet-446fdc97-b723-467b-8b07-ac8d9e997013.jpg?1538463980',
             controlledPosition: { x: 100, y: 100} }
        ]
      });
     await map.save()
    }
     // console.log(map);
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
} ;

connectDB();

app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/map', require('./routes/map'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

