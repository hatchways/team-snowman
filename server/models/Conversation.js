const mongoose = require("mongoose");
const Profile = require("./Profile");
const Schema = mongoose.Schema;
const message = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "Profile" },
  message: String,
  date: Date,
});

const conversationSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  messages: {
    type: [message],
  },
});

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
