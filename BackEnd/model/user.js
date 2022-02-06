console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > user.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");
var config = require("../config.js");
var jwt = require("jsonwebtoken");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------
let User = {
  // [Done]
  insert: function (user, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
        ca1.users (username, email, contact, password)
        VALUES
        (?, ?, ?, ?);
        `;

        dbConn.query(
          sql,
          [user.d_userName, user.d_email, user.d_contact, user.d_password],
          (error, q_result) => {
            dbConn.end();

            if (error) {
              console.log("query error");
              console.log(error);
              return callback(error, null);
            }

            console.log(q_result);

            return callback(null, q_result);
          }
        );
      }
    });
  },
  // [Done]
  findAll: function (callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = "SELECT * FROM ca1.users";

        dbConn.query(sql, [], (error, resultSet) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            return callback(error, null);
          }

          console.log(resultSet);

          if (resultSet.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, resultSet);
          }
        });
      }
    });
  },
  // [Done]
  findByID: function (userID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = "SELECT * FROM ca1.users WHERE userid = ?;";

        dbConn.query(findUserByIDQuery, [userID], (error, resultSet) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            return callback(error, null);
          }
          console.log(resultSet);

          if (resultSet.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, resultSet[0]);
          }
        });
      }
    });
  },
  // [Done]
  edit: function (userID, user, callback) {
    // Get the access card
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        UPDATE
          ca1.users
        SET
          username = ?,
          email = ?,
          contact = ?,
          password = ?,
          role = ?,
          profile_pic_url = ?
        WHERE
          userid = ?
        `;

        dbConn.query(
          sql,
          [
            user.d_userName,
            user.d_email,
            user.d_contact,
            user.d_password,
            user.d_role,
            user.d_profilePic,
            userID,
          ],
          (error, q_result) => {
            dbConn.end();

            console.log(sql);

            if (error) {
              console.log("query error");
              console.log(error);
              return callback(error, null);
            }

            console.log(q_result);

            return callback(null, q_result);
          }
        );
      }
    });
  },
  // [Done]
  loginUser: function (username, password, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        var sql = `
        select 
          userid,
          username,
          email,
          contact,
          role,
          profile_pic_url
        from 
          users
        where 
          username = ? AND 
          password = ?
        `;

        conn.query(sql, [username, password], function (err, result) {
          conn.end();

          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            if (result.length == 0) {
              return callback(null, null);
            } else {
              // it must be that we have only ONE result here,
              // since the email is unique.

              // confirm we have the key
              console.log("Secret key:" + config.key);

              // Generate the token
              let token = jwt.sign(
                //  (1) Payload
                {
                  id: result[0].userid,
                  role: result[0].role,
                },
                // (2) Secret Key
                config.key,
                // (3) Lifetime of token
                {
                  //expires in 24 hrs(in)
                  expiresIn: 86400,
                }
              );

              let finalResult = {
                f_token: token,
                f_userInfo: {
                  ci_uid: result[0].userid,
                  ci_username: result[0].username,
                  ci_email: result[0].email,
                  ci_role: result[0].role,
                  ci_pic: result[0].profile_pic_url,
                  ci_contact: result[0].contact,
                },
              };

              return callback(null, finalResult);
              // return callback(null, token);
            }
          }
        });
      }
    });
  },
  // [Working]
  getInterests: function (userID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
        SELECT 
          fk_category_id
        FROM 
          interests
        WHERE
          fk_user_id = ?;
        `;

        dbConn.query(findUserByIDQuery, [userID], (error, resultSet) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            return callback(error, null);
          }
          console.log(resultSet);

          if (resultSet.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, resultSet);
          }
        });
      }
    });
  },

  // [Done]
  delete: function (userID, callback) {
    // Get the access card
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
          DELETE FROM
            users
          WHERE 
            userid = ?
          `;

        dbConn.query(sql, [userID], (error, q_result) => {
          dbConn.end();

          if (error) {
            console.log("query error");
            console.log(error);
            return callback(error, null);
          }

          console.log(q_result);

          return callback(null, q_result);
        });
      }
    });
  },

  // [Done]
  // Image Extra Feature
  // Saving Images
  addImageById: function (userID, picture, callback) {
    // Get the access card
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        UPDATE
          ca1.users 
        SET
          users.profile_pic_url = ?
        WHERE
          users.userid = ?
        `;

        dbConn.query(sql, [picture, userID], (error, q_result) => {
          dbConn.end();

          if (error) {
            console.log("query error");
            console.log(error);
            return callback(error, null);
          }

          console.log(q_result);

          return callback(null, q_result);
        });
      }
    });
  },

  // [Done]
  // Retrieving Images
  getImageById: function (userID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
          SELECT 
              profile_pic_url
          FROM 
              ca1.users
          WHERE 
              userid = ?
          `;

        dbConn.query(findUserByIDQuery, [userID], (error, resultSet) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            return callback(error, null);
          }
          console.log(resultSet);

          if (resultSet.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, resultSet);
          }
        });
      }
    });
  },
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = User;
