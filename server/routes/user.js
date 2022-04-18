const mongoose = require("mongoose");
const User = require("../models/User");
const router = require("express").Router();

router.get("/:userId", (req, res) => {
  console.log(req.params);
});

router.patch("/:userId", (req, res) => {
  console.log(req.parems.id);
});

module.exports = router;
