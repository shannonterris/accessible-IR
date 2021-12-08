// const Secret = require("./aws");

const cors = require("cors");
const http = require("http");
const express = require("express");

const router = require("./router");
const app = express();
const server = http.createServer(app);

const { logger } = require("./logger");
const fs = require("fs");
const readFilePromise = require("fs-readfile-promise");
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-2" });
const BUCKET_NAME = "accessible-ir-logs";

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// const s3 = new AWS.S3({
//   accessKeyId: Secret.access_key,
//   secretAccessKey: Secret.secret_key,
// });

app.use(cors());
app.use(router);

let currentFile = "activity.log";

function updateFileName() {
  return readFilePromise("activity.log", "utf8").then((data) => {
    // if activity file is empty, want to create a new file so we dont't delete content in S3 bucket
    console.log(data.length);
    if (data.length === 0) {
      const now = new Date();
      currentFile = "activity" + now.getTime() + ".log";
    }
  });
}

function uploadLogs() {
  fs.readFile("activity.log", (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: BUCKET_NAME,
      Key: currentFile,
      Body: data,
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
}

function logMessage(id, text, timestamp) {
  updateFileName().then(() => {
    const d = new Date(timestamp);
    logger.info("Time: " + d + " | " + id + " said: " + text);
    //uploadLogs();
  });
}

function logSearch(id, text, timestamp) {
  updateFileName().then(() => {
    const d = new Date(timestamp);
    logger.info("Time: " + d + " | " + id + " searched for: " + text);
    //uploadLogs();
  });
}

function logGrid(id, text, timestamp) {
  updateFileName().then(() => {
    const d = new Date(timestamp);
    const images = JSON.parse(text).map((image) => image.i);
    if (images.length > 0) {
      logger.info("Time: " + d + " | " + id + " sent image grid: " + images);
    }
    //uploadLogs();
  });
}

function logTouch(id, text, timestamp) {
  updateFileName().then(() => {
    const d = new Date(timestamp);
    logger.info("Time: " + d + " | " + id + " touched image: " + text);
    //uploadLogs();
  });
}

function logText(id, text, timestamp) {
  updateFileName().then(() => {
    const d = new Date(timestamp);
    logger.info("Time: " + d + " | " + id + " sent text: " + text);
    //uploadLogs();
  });
}

function clearLogs() {
  fs.truncate("./activity.log", 0, function () {
    console.log("Deleted Contents of Log File");
  });
}

io.on("connection", (socket) => {
  const id = socket.handshake.query.id; // id of client connected
  socket.join(id);
  console.log(id); // testing

  socket.on("send-message", ({ text, timestamp }) => {
    const recipient = id === "userProfile" ? "helperProfile" : "userProfile";
    if (text) {
      logMessage(id, text, timestamp);
    }
    socket.broadcast.to(recipient).emit("receive-message", {
      sender: id,
      text,
      timestamp,
    });
  });

  socket.on("send-text", ({ text, timestamp }) => {
    const recipient = "userProfile";
    if (text) {
      logText("helperProfile", text, timestamp);
    }
    socket.broadcast.to(recipient).emit("receive-text", { text });
  });

  socket.on("search-google", ({ searchText, timestamp }) => {
    logSearch(id, searchText, timestamp);
  });

  socket.on("delete-log", () => {
    clearLogs();
  });

  socket.on("send-image", ({ layout, timestamp }) => {
    if (layout.length > 0) {
      logGrid(id, layout, timestamp);
    }
    const recipient = "userProfile";
    socket.broadcast.to(recipient).emit("receive-image", {
      sender: id,
      layout,
      timestamp,
    });
  });

  socket.on("send-touch", ({ image, timestamp }) => {
    logTouch(id, image, timestamp);
    const recipient = "helperProfile";
    socket.broadcast.to(recipient).emit("receive-touch", {
      sender: id,
      image,
      timestamp,
    });
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
