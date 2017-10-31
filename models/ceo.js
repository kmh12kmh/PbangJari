var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var ceoSchema = new Schema({
  ceoId: {
    type: String,
    require: true,
    unique: true
  },
  passWd: {
    type: String,
    select: false
  },
  userName: {
    type: String,
    require: true
  },
  license: {
    type: String,
    require: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('ceo', ceoSchema);
