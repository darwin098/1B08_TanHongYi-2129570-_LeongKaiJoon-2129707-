console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > review.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------

let Review = {
  // [Done]
  insert: function (productid, review, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
            ca1.review (fk_product_id, fk_user_id, rating, review)
        VALUES
            (?, ?, ?, ?);
        `;

        dbConn.query(
          sql,
          [productid, review.d_userid, review.d_rating, review.d_review],
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
  showReviews: function (productid, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection got issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllQuery = `
        SELECT 
          review.fk_product_id AS productid,
          review.fk_user_id AS userid,
            users.username AS username,
          review.rating,
          review.review,
          review.created_at
        FROM 
          review
        INNER JOIN
          users ON review.fk_user_id=users.userid
        WHERE 
          review.fk_product_id = ?
        `;
        dbConn.query(findAllQuery, [productid], (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          }
          console.log(results);
          return callback(null, results);
        });
      }
    });
  },
  // [Done]
  findByID: function (productid, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection got issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllQuery = `
        SELECT 
          review.fk_product_id AS productid,
          review.fk_user_id AS userid,
            users.username AS username,
          review.rating,
          review.review,
          review.created_at
        FROM 
          review
        INNER JOIN
          users ON review.fk_user_id=users.userid
        WHERE 
          review.reviewid = ?
        `;
        dbConn.query(findAllQuery, [productid], (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          }
          console.log(results);
          return callback(null, results);
        });
      }
    });
  },
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = Review;
