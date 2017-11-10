var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  uuid = {
    type : String,
    require : true,
    unique : true
  }
  kaccount_email: {
    type: String
  },
  nickname: {
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
