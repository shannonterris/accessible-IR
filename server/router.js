const express = require("express");
const router = express.Router();

router.get("/download", (req, res) => {
  const file = "activity.log";
  res.download(file);
});

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

module.exports = router;
