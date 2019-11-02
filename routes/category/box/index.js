var express = require("express");
var router = express.Router();
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const SendBox = require("../../../model/sendBox");
// var sendRandomData = require("../../../module/send_random_data");

/* GET users listing. */
router.post("/", (req, res) => {
  SendBox.read()
    .then(({ code, json }) => {
      res.status(code).send(json);
    })
    .catch(err => {
      console.log(err);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});
module.exports = router;
