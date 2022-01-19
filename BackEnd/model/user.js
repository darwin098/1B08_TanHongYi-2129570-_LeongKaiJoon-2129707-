console.log("----------------------------");
console.log("CA1 > model > user.js");
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

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
        ca1.users (username, email, contact, password, type, profile_pic_url)
        VALUES
        (?, ?, ?, ?, ?, ?);
        `;

        dbConn.query(
          sql,
          [
            user.d_userName,
            user.d_email,
            user.d_contact,
            user.d_password,
            user.d_type,
            user.d_profilePic,
          ],
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
          type = ?,
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
            user.d_type,
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
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = User;
