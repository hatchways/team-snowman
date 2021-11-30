const Request = require("../models/Request");
const User = require("../models/User");
const organizeRequests = require("../utils/organizeRequests");
const asyncHandler = require("express-async-handler");

// @route POST /request
// @desc create a new pet sitting request
// @access Private
exports.makeRequest = asyncHandler(async (req, res, next) => {
  const body = req.body;
  if (!(body || body.sitter || body.owner || body.duration)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const sitter = await User.findById(body.sitter);
  if (!sitter) {
    res.status(404);
    throw new Error("Sitter doesn't exist");
  }
  if (Date.parse(body.duration.end) < Date.parse(body.duration.start)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const newRequest = await Request.create({
    owner: req.user.id,
    sitter: body.sitter,
    duration: {
      start: new Date(body.duration.start),
      end: new Date(body.duration.end),
    },
  });
  if (newRequest) {
    res.status(200).json({
      success: {
        request: newRequest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error creating request");
  }
});

// @route GET /request
// @desc Get requests for a logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    $or: [{ owner: req.user.id }, { sitter: req.user.id }],
  })
    .populate("sitter", ["username", "email", "_id"])
    .populate({
      path: "owner",
      model: "User",
      select: "email profile _id username",
      populate: { path: "profile", model: "Profile" },
    });
  const processedRequests = await organizeRequests(requests);
  res.status(200).json({
    success: {
      requests: processedRequests,
    },
  });
});

// @route PATCH /request
// @desc Update a user's request
// @access Private
exports.editRequest = asyncHandler(async (req, res, next) => {
  const bodyData = ({
    duration,
    accepted,
    totalCost,
    completed,
    notes,
    viewed,
  } = req.body);
  const newRequestData = {
    ...req.params,
    ...bodyData,
  };
  if (!(newRequestData || newRequestData.id || newRequestData.accepted)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const verifyUser = await Request.findOne({ _id: newRequestData.id });

  if (!(req.user.id == verifyUser.owner || req.user.id == verifyUser.sitter)) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedRequest = await Request.findOneAndUpdate(
    { _id: newRequestData.id },
    newRequestData,
    { new: true }
  );
  if (updatedRequest) {
    const requests = await Request.find({
      $or: [{ owner: req.user.id }, { sitter: req.user.id }],
    })
      .populate("sitter", ["username", "email", "_id"])
      .populate({
        path: "owner",
        model: "User",
        select: "email profile _id username",
        populate: { path: "profile", model: "Profile" },
      });
    const processedRequests = await organizeRequests(requests);
    res.status(200).json({
      success: {
        requests: processedRequests,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error updating request");
  }
});
