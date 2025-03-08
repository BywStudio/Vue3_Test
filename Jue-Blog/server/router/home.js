const express = require("express");
const router = express.Router();

router.all("/", (req, res) => {
  res.send("首页 API");
});

module.exports = router;
