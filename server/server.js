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

  // TODO: handling of sending an image
  // socket.on("send-image", ({ text, timestamp }) => {
  //   const recipient = id === "userProfile" ? "helperProfile" : "userProfile";
  //   logMessage(id, text, timestamp);
  //   socket.broadcast.to(recipient).emit("receive-message", {
  //     sender: id,
  //     text,
  //     timestamp,
  //   });
  // });
});
