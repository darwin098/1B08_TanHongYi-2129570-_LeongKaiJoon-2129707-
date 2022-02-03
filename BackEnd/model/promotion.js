console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > promotion.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------

let Promotion = {
  // [Done]
  insert: function (promo, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
        ca1.promotions (productid, promotion, discountamount, description, promotionperiodstart, promotionperiodend, duration)
        VALUES
        (?, ?, ?, ?, ?, ?, ?);
        `;

        dbConn.query(
          sql,
          [
            promo.d_productid,
            promo.d_promotion,
            promo.d_discountamount,
            promo.d_description,
            promo.d_promostart,
            promo.d_promoend,
            promo.d_duration,
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
  showAllPromos: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection got issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllQuery = `
        SELECT 
          pm.*,
          pd.name,
          pd.price
        FROM 
          promotions AS pm,
            product AS pd
        WHERE
          pm.productid = pd.productid;
        `;
        dbConn.query(findAllQuery, (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  // [Done]
  findByPromoID: function (promoID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
        SELECT 
            productid, promotion, discountamount, description, promotionperiodstart, promotionperiodend, duration
        FROM 
            ca1.promotions
        WHERE 
            promoid = ?
        `;

        dbConn.query(findUserByIDQuery, [promoID], (error, resultSet) => {
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
  findByProductID: function (productID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
        SELECT 
            promoid, promotion, discountamount, description, promotionperiodstart, promotionperiodend, duration
        FROM 
            ca1.promotions
        WHERE 
            productid = ?
        `;

        dbConn.query(findUserByIDQuery, [productID], (error, resultSet) => {
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
  deletePromo: function (promoID, callback) {
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
              ca1.promotions
            WHERE 
              promoid = ?
            `;

        dbConn.query(sql, [promoID], (error, q_result) => {
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
module.exports = Promotion;
