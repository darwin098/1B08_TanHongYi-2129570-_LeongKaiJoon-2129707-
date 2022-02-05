console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > interest.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------

let Interest = {
  // [Done]
  insert: function (userID, categoryIDs, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
            ca1.interests (fk_user_id, fk_category_id)
        VALUES
            (?, ?);
        `;

        for (i = 0; i < categoryIDs.length; i++) {
          dbConn.query(sql, [userID, categoryIDs[i]], (error, q_result) => {
            if (error) {
              console.log("query error");
              console.log(categoryIDs);
              console.log(error);
              return callback(error, null);
            }

            console.log(q_result);

            return callback(null, q_result);
          });
        }
        dbConn.end();
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
            interests
          WHERE 
            fk_user_id = ?
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
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = Interest;
