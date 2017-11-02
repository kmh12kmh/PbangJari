var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var pcMapSchema = new Schema({
  pcBangId: {
    type: Schema.Types.ObjectId,
    ref: 'pcBang',
    require: true
  },
  totalFloor: {
    type: Number,
    default: 0
  },
  eachFloor: [{
    pcTableSize: {
      horizontal: {
        type: Number
      },
      vertical: {
        type: Number
      }
    },
    pcPlacement: [{
      pcNumber: {
        type: Number
      },
      placeNumber: {
        type: Number
      },
      pcIPAdress: {
        type: Number
      }
    }]
  }]
});

module.exports = mongoose.model('pcmap', pcMapSchema);
