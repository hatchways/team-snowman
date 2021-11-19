const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

const notifications = {
  newRequest: {
    title: "New Request",
    message: "You recieved a new request from ",
  },
  message: {
    title: "New Message",
    message: "You received a new message from ",
  },
  requestResponse: {
    title: "Response Received",
    message: "You received a response from ",
  },
};

// @route POST /notification/:id
// @desc create notification
// @access Private
exports.createNotification = asyncHandler(async (req, res) => {
  const sender = rep.params.sender;
  const type = req.params.type;
  const userId = req.params.userId;

  if (!sender | type | userid) {
    res.status(400);
    throw new Error("Bad Request");
  }

  const newNotification = await Notification.create({
    type,
    title: notifications.type.title,
    description: `${notifications.type.message}${sender}`,
    date: new Date.now(),
    userId,
  });

  if (!newNotification) {
    res.status(200).json({
      success: {
        profile: newNotification,
      },
    });
  }
  res.status(500);
  throw new Error("Error handling request");
});

// @route GET /notification
// @desc Get user profile data
// @access Private
exports.getNewNotifications = asyncHandler(async (req, res) => {
  const newNotifcations = await Notification.find({
    userId: req.user.id,
    read: false,
  });
  if (!newNotifcations && newNotifcations == []) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      newNotifcations,
    },
  });
});

// @route GET /notification/all
// @desc all user notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res) => {
  const newNotifcations = await Notification.find({
    userId: req.user.id,
  });
  if (!newNotifcations && newNotifcations == []) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      newNotifcations,
    },
  });
});

// @route PATCH /notification
// @desc read user notifications
// @access Private
exports.readNotifications = asyncHandler(async (req, res) => {
  success = await Notification.updateMany(
    { userId: req.user.id },
    { read: true }
  );
  if (!success) {
    res.status(500);
    throw new Error("Error hanlding request");
  }
  const newNotifcations = await Notification.find({
    userId: req.user.id,
  });
  res.status(200).json({
    success: {
      newNotifcations,
    },
  });
});
