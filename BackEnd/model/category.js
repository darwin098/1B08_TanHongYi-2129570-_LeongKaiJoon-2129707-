console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > category.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------

let Category = {
  // [Done]
  insert: function (category, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
        ca1.category (category, description)
        VALUES
        (?, ?);
        `;

        dbConn.query(
          sql,
          [category.d_category, category.d_description],
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
        const sql = "SELECT * FROM ca1.category";

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
  findAllBrands: function (callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = "SELECT DISTINCT brand FROM ca1.product;";

        dbConn.query(sql, (error, resultSet) => {
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
module.exports = Category;
