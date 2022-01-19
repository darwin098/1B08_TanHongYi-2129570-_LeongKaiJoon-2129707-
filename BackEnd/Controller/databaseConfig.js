console.log("----------------------------");
console.log("Assignment1 > Controller > databaseConfig.js");
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const mysql = require("mysql");

// -------------------------------------------------------------
// main code implementations
// -------------------------------------------------------------
var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "JkC33wYjaP+yD9*p",
      database: "ca1",
      dateStrings: true,
    });

    return conn;
  },
};

// -------------------------------------------------------------
// exports
// -------------------------------------------------------------
module.exports = dbconnect;
