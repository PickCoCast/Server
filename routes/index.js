var express = require('express');
var router = express.Router();
var categoryRouter = require('./category');
/* GET home page. */

router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});
router.use('/category', categoryRouter);
module.exports = router;
