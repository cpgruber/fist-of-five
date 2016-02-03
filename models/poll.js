var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/fof");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var PollSchema = new Schema({
  createdAt: Date,
  count: Number,
  code:String,
  fist:Object
})

var PollModel = mongoose.model("Poll", PollSchema);

module.exports = PollModel;
