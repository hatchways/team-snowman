const Notification = require("../models/Notification");
const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route POST /notification/
// @desc create notification
// @access Private
exports.createNotification = asyncHandler(async (req, res) => {
  const { type, data } = req.body;
  const userId = req.user.id;

  if (!data | !type | !userId) {
    res.status(400);
    throw new Error("Bad Request");
  }
  if (!type === ("message" || "newRequest" || "requestUpdate")) {
    res.status(400);
    throw new Error("Bad Request");
  }

  const request = await Request.findById(data);
  const recipient = type === "newRequest" ? "sitter" : "owner";
  const profile = await User.findById(request[recipient]).populate("profile");

  const date = new Date(request.duration.start).toLocaleDateString();
  const durationMS = request.duration.end - request.duration.start;
  const duration = Math.floor((durationMS / (1000 * 60 * 60)) % 24);

  const newNotification = await Notification.create({
    type,
    userId,
    data: {
      requestId: data,
      firstName: profile.profile.firstName || "",
      photo: profile.profile.photo || "nophoto",
      duration,
      date,
    },
  });

  if (newNotification) {
    res.status(200).json({
      success: {
        notification: newNotification,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error handling request");
  }
});

// @route GET /notification
// @desc Get user profile data
// @access Private
exports.getNewNotifications = asyncHandler(async (req, res) => {
  const newNotifications = await Notification.find({
    userId: req.user.id,
    read: false,
  }).populate({
    path: "data",
    model: Request,
  });
  if (!newNotifications) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      newNotifications,
    },
  });
});

// @route GET /notification/all
// @desc all user notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res) => {
  const allNotifications = await Notification.find({
    userId: req.user.id,
  }).populate({
    path: "data",
    model: Request,
  });
  if (!allNotifications) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      allNotifications,
    },
  });
});

// @route PATCH /notification
// @desc read user notifications
// @access Private
exports.readNotifications = asyncHandler(async (req, res) => {
  const success = await Notification.updateMany(
    { userId: req.user.id },
    { read: true }
  );
  if (!success) {
    res.status(500);
    throw new Error("Error handling request");
  }
  const newNotifications = await Notification.find({
    userId: req.user.id,
    read: false,
  }).populate({
    path: "data",
    model: Request,
  });
  res.status(200).json({
    success: {
      newNotifications,
    },
  });
});
