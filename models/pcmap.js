var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var pcMapSchema = new Schema({
  pcBangId: {
    type: Schema.Types.ObjectId,
    ref: 'pcBang'
  },
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
    }
  }]
});
module.exports = mongoose.model('pcmap', pcMapSchema);
