var express = require("express");
var router = express.Router();
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const Send = require("../../../model/sendMan");
// var sendRandomData = require("../../../module/send_random_data");

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   const length = dummys.length;
//   let randomIdx = Math.floor(Math.random() * length);
//   res.json(dummys[randomIdx]);
// });

let like = 0;
let notYet = -1;

router.post("/", (req, res) => {
  Send.readRandom()
    .then(({ code, json }) => {
      notYet = json.data.id;
      console.log(notYet);
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
