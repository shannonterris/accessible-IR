const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

function logMessage(id, text, timestamp) {
  const d = new Date(timestamp);
  console.log("Time: " + d + " | " + id + " sent: " + text);
}

function logSearch(id, text, timestamp) {
  const d = new Date(timestamp);
  console.log("Time: " + d + " | " + id + " searched for: " + text);
}

function logGrid(id, text, timestamp) {
  const d = new Date(timestamp);
  console.log("Time: " + d + " | " + id + " sent image grid: " + text);
}

function logTouch(id, text, timestamp) {
  const d = new Date(timestamp);
  console.log("Time: " + d + " | " + id + " touched image: " + text);
}

io.on("connection", (socket) => {
  const id = socket.handshake.query.id; // id of client connected
  socket.join(id);
  console.log(id); // testing

  socket.on("send-message", ({ text, timestamp }) => {
    const recipient = id === "userProfile" ? "helperProfile" : "userProfile";
    logMessage(id, text, timestamp);
    socket.broadcast.to(recipient).emit("receive-message", {
      sender: id,
      text,
      timestamp,
    });
  });

  socket.on("search-google", ({ searchText, timestamp }) => {
    logSearch(id, searchText, timestamp);
  });

  socket.on("send-image", ({ layout, timestamp }) => {
    logGrid(id, layout, timestamp);
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
