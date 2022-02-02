console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > model > product.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const db = require("../Controller/databaseConfig");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------

let Product = {
  // [Done]
  insert: function (product, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        INSERT INTO 
        ca1.product (name, description, categoryid, brand, price)
        VALUES
        (?, ?, ?, ?, ?);
        `;

        dbConn.query(
          sql,
          [
            product.d_name,
            product.d_description,
            product.d_categoryid,
            product.d_brand,
            product.d_price,
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
  findByCategory: function (productCategory, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
          SELECT 
              P.productid,
              P.name,
              P.description,
              P.categoryid,
              C.category AS categoryname,
              P.brand,
              P.price
          FROM 
              ca1.product AS P,
              ca1.category AS C 
          WHERE 
              P.categoryid = C.categoryid AND
              C.category = ?
          `;

        dbConn.query(sql, [productCategory], (error, resultSet) => {
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
  findByBrand: function (categoryBrand, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
          SELECT 
              P.productid,
              P.name,
              P.description,
              P.categoryid,
              C.category AS categoryname,
              P.brand,
              P.price
          FROM 
              ca1.product AS P,
              ca1.category AS C 
          WHERE 
              P.categoryid = C.categoryid AND
              P.brand = ?
          `;

        dbConn.query(sql, [categoryBrand], (error, resultSet) => {
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
  findByName: function (productName, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        SELECT 
            P.productid,
            P.name,
            P.description,
            P.categoryid,
            C.category AS categoryname,
            P.brand,
            P.price
        FROM 
            ca1.product AS P,
            ca1.category AS C 
        WHERE 
            P.categoryid = C.categoryid AND
            P.name = ?
        `;

        dbConn.query(sql, [productName], (error, resultSet) => {
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
  findByID: function (productID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const sql = `
        SELECT 
            P.productid,
            P.name,
            P.description,
            P.categoryid,
            C.category AS categoryname,
            P.brand,
            P.price
        FROM 
            ca1.product AS P,
            ca1.category AS C 
        WHERE 
            P.categoryid = C.categoryid AND
            P.productid = ?
        `;

        dbConn.query(sql, [productID], (error, resultSet) => {
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
  delete: function (productID, callback) {
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
          ca1.product
        WHERE 
          productid = ?
        `;

        dbConn.query(sql, [productID], (error, q_result) => {
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
  // [Working]
  // Image Extra Feature
  // Saving Images
  addImageById: function (productID, picture, callback) {
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
          ca1.product 
        SET
          product.picture = ?
        WHERE
          product.productid = ?
        `;

        dbConn.query(sql, [picture, productID], (error, q_result) => {
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
  // [Working]
  // Retrieving Images
  getImageById: function (productID, callback) {
    var dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        console.log("connection error");
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
          SELECT 
              picture
          FROM 
              ca1.product
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
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = Product;
