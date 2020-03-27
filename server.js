const express = require('express');
const mongoose = require('mongoose');
const Map = require('./models/map');
const app = express();
const path = require('path');
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/users';


const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_URI,
    { useNewUrlParser: true, useUnifiedTopology: true  });
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
        ],
        savedPlayers: [
          {name: 'Rusty',
          url: 'https://i.ya-webdesign.com/images/dd-fighter-png-2.png',
          controlledPosition: { x: 100, y: 100}
        },
          {
            name: 'odan',
            url: 'https://cdna.artstation.com/p/assets/images/images/013/185/354/medium/john-paul-balmet-446fdc97-b723-467b-8b07-ac8d9e997013.jpg?1538463980'
          , controlledPosition: { x: 100, y: 100}
          }
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

app.use('/map', require('./routes/map'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (rep,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

