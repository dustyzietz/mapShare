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
       url : {
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
      monster: Boolean,
      hp: Number,
      ac: Number,
      speed:  Number,
      currentHp:  Number,
      attacks:[
         {
          weapon: String,
          hit: Number,
          amountOfDice: Number,
          diceType: Number,
          plus: Number,
          critOn: Number,
          critTimes: Number
        }
      ],
      spells: [
        {
          name: String,
          effect: String,
          dc: String,
          other: String,
        }
      ],
      usableItems: [
        {
          name: String,
          quantity: Number,
          effect: String,
        }
      ],
      skills:[ 
        {
          name: String,
          bonus: Number,   
        }
      ],
      items: {type: String},
      str: {type: String},
      int: {type: String},
      wis: {type: String},
      dex: {type: String},
      con: {type: String},
      cha: {type: String},
      ref: {type: String},
      fort: {type: String},
      will: {type: String},
      size: {type: Number}
      }
    ],
    savedPlayers : [ 
      {
        name: {
        type: String,
        required: true 
        },
        url : {
         type: String,
         required: true
          },
      monster: Boolean,
      hp: Number,
      ac: Number,
      speed:  Number,
      currentHp:  Number,
      attacks:[
         {
          weapon: String,
          hit: Number,
          amountOfDice: Number,
          diceType: Number,
          plus: Number,
          critOn: Number,
          critTimes: Number
        }
      ],
      spells: [
        {
          name: String,
          effect: String,
          dc: String,
          other: String,
        }
      ],
      usableItems: [
        {
          name: String,
          quantity: Number,
          effect: String,
        }
      ],
      skills:[ 
        {
          name: String,
          bonus: Number,   
        }
      ],
      items: {type: String},
      str: {type: String},
      int: {type: String},
      wis: {type: String},
      dex: {type: String},
      con: {type: String},
      cha: {type: String},
      ref: {type: String},
      fort: {type: String},
      will: {type: String},
      size: {type: Number}
      }
    ],
    savedMaps : [ 
      { name: {
        type: String
      },
      url: {
        type: String,
        required: true
      }
    }
    ]
});

module.exports = mongoose.model('Map', mapSchema);