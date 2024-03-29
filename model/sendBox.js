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
        const picArr = userArray.map(element => {
          return element.img_url;
        });
        console.log(userArray);
        console.log(picArr);
        // 로그인 성공
        return {
          code: statusCode.OK,
          json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, picArr)
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
  },
  liked: ({ name, password, email, phone }) => {
    const table = "sopkathon";
    const fields = "id, name, password, email, phone";
    const questions = "?, ?, ?, ?, ?";
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
    const values = [id, name, password, email, phone];
    return pool
      .queryParam_Parse(query, values)
      .then(async userResult => {
        console.log(userResult);
        if (userResult.length == 0) {
          return {
            code: statusCode.BAD_REQUEST,
            json: authUtil.successFalse(responseMessage.NO_USER)
          };
        }
        const user = userResult[0];
        // 비밀번호 체크
        const { hashed } = await encrypt.encryptWithSalt(password, user.salt);
        if (user.password != hashed) {
          return {
            code: statusCode.BAD_REQUEST,
            json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
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
  }
};
