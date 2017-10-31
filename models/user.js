var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userId: {
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
  age: {
    type: Number,
    require: true
  }
  email: {
    type: String,
    require: true,
    unique: true
  },
  tel: {
    type: String
  },
  markPCBang: [{
    type: Schema.Types.ObjectId,
    ref: 'pcBang'
  }],
  createDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('user', userSchema);
