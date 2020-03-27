const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mapSchema = new Schema({
    mapName: {
      type: String,
      required: true
    },
    mapUrl: {
      type: String,
      required: true
    },
    players: [
      {
        name: {
        type: String,
        required: true 
        },
       playerUrl : {
         
          },
      controlledPosition : {
        x: {
           type: Number,
          required: true 
        },
        y: {
          type: Number,
         required: true 
       }
      }
      }
    ],
    savedPlayers : [ 
      { name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      controlledPosition : {
        x: {
           type: Number,
          required: true 
        },
        y: {
          type: Number,
         required: true 
       }
      }
    }
    ]
});

module.exports = mongoose.model('Map', mapSchema);