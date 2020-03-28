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
      },
      hp:{type: Number},
      ac: {type: Number},
      attacks: {type: String},
      spells: {type: String},
      items: {type: String}
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
       },
          hp:{type: Number},
       ac: {type: Number},
       attacks: {type: String},
       spells: {type: String},
       items: {type: String}
    }
    ]
});

module.exports = mongoose.model('Map', mapSchema);