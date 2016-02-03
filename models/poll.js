var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/fof");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var PollSchema = new Schema({
  createdAt: Date,
  code:String
})

var PollModel = mongoose.model("Poll", PollSchema);

module.exports = PollModel;
