var express = require("express");
var router = express.Router();
var manRouter = require("./man");
var womanRouter = require("./woman");
var foodRouter = require("./food");
var etcRouter = require("./etc");
var boxRouter = require("./box");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("This is category");
});
router.use("/box", boxRouter);
router.use("/man", manRouter);
router.use("/woman", womanRouter);
router.use("/food", foodRouter);
router.use("/etc", etcRouter);

module.exports = router;
