const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const notificationRouter = require("./routes/notification");
const paymentRouter = require("./routes/payment");
const requestRouter = require("./routes/request");
const conversationRouter = require("./routes/conversation");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  if (socket.handshake.headers.cookie) {
    token = cookie.parse(socket.handshake.headers.cookie).token;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next(new Error("Authorization Error"));
    }
  } else {
    next(new Error("Authorization Error"));
  }
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("goOnline", (onlineUser) => {
    console.log(`New socket connection, id:'${onlineUser.id}'`);
    socket.join(`${onlineUser.id}`);
  });
  socket.on("sendNotification", (userId) => {
    io.sockets.to(`${userId}`).emit("newNotification");
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/request", paymentRouter);
app.use("/notification", notificationRouter);
app.use("/conversation", conversationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
