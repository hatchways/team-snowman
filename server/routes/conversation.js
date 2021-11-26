const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  newMessage,
} = require("../controllers/conversation");

router.route("/").post(protect, createConversation);

router.route("/new-message").post(protect, newMessage);

module.exports = router;
