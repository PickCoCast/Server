const authUtil = require("../module/authUtil");
const statusCode = require("../module/statusCode");
const responseMessage = require("../module/responseMessage");
const pool = require("../module/poolAsync");

module.exports = {
  read: () => {
    const table = "sopkathon";
    const query =
      "SELECT * FROM" + " `sopt-server`" + `.${table} WHERE isLiked=1`;
    return pool
      .queryParam_None(query)
      .then(result => {
        const userArray = result;
        console.log(userArray);
        const user = userArray[0];
        if (!user) {
          return {
            code: statusCode.BAD_REQUEST,
            json: authUtil.successFalse(responseMessage.NO_USER)
          };
        }
        // 로그인 성공
        return {
          code: statusCode.OK,
          json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
        };
      })
      .catch(err => {
        // ER_DUP_ENTRY
        if (err.errno == 1062) {
          console.log(err.errno, err.code);
          return {
            code: statusCode.BAD_REQUEST,
            json: authUtil.successFalse(responseMessage.ALREADY_ID)
          };
        }
        console.log(err);
        throw err;
      });
  },
  readRandom: () => {
    const table = "sopkathon";
    const query = "SELECT * FROM" + " `sopt-server`" + `.${table}`;
    return pool
      .queryParam_None(query)
      .then(result => {
        const userArray = result;
        let length = userArray.length;
        let randomIdx = Math.floor(Math.random() * length);
        const rand = userArray[randomIdx];
        console.log(rand);

        // 로그인 성공
        return {
          code: statusCode.OK,
          json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, rand)
        };
      })
      .catch(err => {
        // ER_DUP_ENTRY
        if (err.errno == 1062) {
          console.log(err.errno, err.code);
          return {
            code: statusCode.BAD_REQUEST,
            json: authUtil.successFalse(responseMessage.ALREADY_ID)
          };
        }
        console.log(err);
        throw err;
      });
  }
};
