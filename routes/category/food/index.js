var express = require("express");
var router = express.Router();
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const Send = require("../../../model/sendFood");

router.post("/", (req, res) => {
  Send.readRandom()
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
