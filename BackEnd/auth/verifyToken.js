console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > auth > verifyToken.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
// import jwt
var jwt = require("jsonwebtoken");
// import secret key
var config = require("../config");

// -------------------------------------------------------------
// Functions
// -------------------------------------------------------------
function verifyToken(req, res, next) {
  console.log(req.headers);

  // retrieve authorization header’s content
  // authorization: Bearer <token>
  var token = req.headers["authorization"];

  // Bearer <token>
  console.log(token);

  // process the token
  if (!token || !token.includes("Bearer")) {
    // !token ==> no token found
    // !token.includes('Bearer') ==> invalid syntax
    return res.status(401).send({
      auth: "false",
      message:
        "Not authorized! Reason(No token found / token has invalid syntax)",
    });
  } else {
    // obtain the token’s value
    token = token.split("Bearer ")[1];

    // <token>
    console.log(token);

    // verify token
    jwt.verify(token, config.key, function (err, decoded) {
      if (err) {
        let errMsg = {
          auth: false,
          message: "Not authorized! Reason(Invalid token)",
        };

        return res.status(401).type("json").end(JSON.stringify(errMsg));
      } else {
        //decode the userid and role... and store in req for use
        req.userid = decoded.id;
        req.role = decoded.role;

        // pass the context to the next MF down the pipeline
        next();
      }
    });
  }
}

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = verifyToken;
