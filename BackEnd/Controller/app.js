console.log("----------------------------");
console.log(
  "1B08_TanHongYi-2129570-_LeongKaiJoon-2129707- > BackEnd > controller > app.js"
);
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const path = require("path");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Multer helps to process form-data elements, like how body-parser helps with process body elements/data
// Sub Section For Multer Intro
const multer = require("multer");
const pfpStorage = multer.diskStorage({
  // Sets storage location
  destination: function (req, file, cb) {
    cb(null, "./profileImg");
  },
  // Sets File Name
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const prodImgStorage = multer.diskStorage({
  // Sets storage location
  destination: function (req, file, cb) {
    cb(null, "./productImg");
  },
  // Sets File Name
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const uploadFilter = (req, file, cb) => {
  // File filtering process
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const pfpupload = multer({
  storage: pfpStorage,
  limits: {
    // File Size is done in bytes
    // 1024 * 1024 Bytes = 1 MB
    fileSize: 1024 * 1024,
  },
  fileFilter: uploadFilter,
});
const prodImgupload = multer({
  storage: prodImgStorage,
  limits: {
    // File Size is done in bytes
    // 1024 * 1024 Bytes = 1 MB
    fileSize: 1024 * 1024,
  },
  fileFilter: uploadFilter,
});
// Multer Stuff Ends Here

const User = require("../model/user");
const Category = require("../model/category");
const Product = require("../model/product");
const Review = require("../model/review");
const Interest = require("../model/interest");
const Promotion = require("../model/promotion");
const verifyToken = require("../auth/verifyToken");

// -------------------------------------------------------------
// Config
// -------------------------------------------------------------
let urlEncodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

// -------------------------------------------------------------
// MF
// -------------------------------------------------------------
function printDebugInfo(req, res, next) {
  console.log();

  console.log(
    "-------------------------- [Debug Info] --------------------------"
  );
  console.log(`Servicing [${req.method}]::${req.url}`);
  console.log(`> req.params: ${JSON.stringify(req.params)}`);
  console.log(`> req.body: ${JSON.stringify(req.body)}`);
  console.log(
    "------------------------ [Debug Info Ends] -----------------------"
  );

  //   remember to pass control to the next MF
  next();
}

// -------------------------------------------------------------
// MF Configurations
// -------------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);
app.use("../uploads", express.static("uploads"));
app.use(cors());

app.options("*", cors());

// -------------------------------------------------------------
// Endpoints (default)
// -------------------------------------------------------------

// Default endpoint
// http://localhost:3000/
app.get("/", (req, res) => {
  console.log("> GET > '/'");

  res.statusCode = 200;
  res.send("GET > (ca2) > '/'");
  res.end();

  console.log("--------------------------------------");
});

// -------------------------------------------------------------
// Endpoints (users)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (users)
// -------------------------------------------------------------

// [Done]
// Login User
// http://localhost:3000/api/login
app.post("/login/", printDebugInfo, function (req, res) {
  // 1. extract
  // Retrieve and set necessary datafields.
  var username = req.body.username;
  var password = req.body.password;

  // 2. validate

  // 3. compile

  // Pass data to the back-end side
  User.loginUser(username, password, function (err, result) {
    //    err     result
    //    false   false ---|
    //    false   true ----|
    //    true    false    |
    //    true    true     |
    if (!err) {
      // -------|
      if (!result) {
        let dataJSON = {
          token: "",
          userInfo: {},
        };

        res.status(200).type("json").send(dataJSON);
      } else {
        let dataJSON = {
          token: result.f_token,
          userInfo: [
            {
              uid: result.f_userInfo.ci_uid,
              username: result.f_userInfo.ci_username,
              email: result.f_userInfo.ci_email,
              role: result.f_userInfo.ci_role,
              pic: result.f_userInfo.ci_pic,
              contact: result.f_userInfo.ci_contact,
            },
          ],
        };

        res.status(200).type("json").send(dataJSON);
      }
    } else {
      res.status(500);
      res.send(err.statusCode);
    }
  });

  // To get a token
});

// [Done]
// Add user(On sign-up)
// http://localhost:3000/users/
app.post("/users/", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let data = {
    d_userName: req.body.username,
    d_email: req.body.email,
    d_contact: req.body.contact,
    d_password: req.body.password,
  };

  // Step 2 and 3: Process and respond
  User.insert(data, function (err, result) {
    let dataJSON = {
      userid: 0,
    };

    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        dataJSON.message = err.sqlMessage;
        res.status(422).type("json").send({ Error: "Duplicate Entry" }).end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    } else {
      if (result.affectedRows == 1) {
        dataJSON.userid = result.insertId;
        res.status(201).type("json").send(dataJSON).end();
      } else {
        res.status(404).type("json").send("No users found!").end();
      }
    }
  });
});

// [Working]
// Show all users(admin) - Show profile picture as well
// http://localhost:3000/users/
app.get("/users/", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction

  // Step 2 and 3: Process and respond
  User.findAll(function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result);
        res.end();
      } else {
        // Send error message response
        res.status(500).send("Internal Server Error").end();
      }
    }
  });
});

// [Working]
// Find user by ID(admin) - Show profile picture as well
// http://localhost:3000/users/24/
app.get("/users/:id/", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let uid = parseInt(req.params.id);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  console.log(`User ID: ${uid}`);

  // Step 2 and 3: Process and respond
  User.findByID(uid, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such ID!").end();
      }
    }
  });
});

// [Working]
// Edit User - Edit profile picture as well
// http://localhost:3000/users/28
app.put("/users/edit/:id/", printDebugInfo, verifyToken, function (req, res) {
  // Step 1: extraction
  let uid = parseInt(req.params.id);

  if (req.role != "admin" || req.role != "user") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }
  if (req.role == "admin") {
    data = {
      d_userName: req.body.username,
      d_email: req.body.email,
      d_contact: req.body.contact,
      d_password: req.body.password,
      d_role: req.body.role,
      d_profilePic: req.body.profile_pic_url,
    };
  } else {
    data = {
      d_userName: req.body.username,
      d_email: req.body.email,
      d_contact: req.body.contact,
      d_password: req.body.password,
      d_role: "user",
      d_profilePic: req.body.profile_pic_url,
    };
  }

  // Step 2 and 3: Process and respond
  User.edit(uid, data, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error").end();
    } else {
      /*
        affectedRows    changedRows
        0               0 <-- user not found
        0               1 <-- impossible
        1               0 <-- not updated
        1               1 <-- good news
      */
      if (result.affectedRows == 0) {
        res
          .status(404)
          .type("json")
          .send(`Message: User(id:${uid}) not found...`)
          .end();
      } else if (result.changedRows == 1) {
        res.status(204).end();
      } else {
        res.status(422).send("The data already exists!").end();
      }
    }
  });
});

// [Reference]
// Show Image
app.get("/product/showimage/:itemid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let uid = parseInt(req.params.itemid);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  Product.getImageById(uid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      console.log(result[0].picture);
      let abImgPath = path.resolve(result[0].picture);
      res.status(201).sendFile(abImgPath);
    }
  });
});

// [Done]
// Delete User
// http://localhost:3000/user/6
app.delete("/user/:userID", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin" && req.role != "user") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let uid = parseInt(req.params.userID);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  User.delete(uid, function (err, result) {
    let dataJSON = {
      status: 0,
      message: "",
    };

    if (err) {
      dataJSON.message = "bad..";

      res.status(500).type("json").send(dataJSON).end();
    } else {
      /*
        affectedRows    changedRows
        0               0 <-- user not found
        0               1 <-- impossible
        1               0 <-- not updated
        1               1 <-- good news
      */
      if (result.affectedRows == 0) {
        dataJSON.message = `User(id:${uid}) not found`;

        res.status(404).type("json").send(dataJSON).end();
      } else {
        dataJSON.status = 1;
        dataJSON.message = `User(id:${uid}) deleted`;

        res.status(200).type("json").send(dataJSON).end();
      }
    }
  });
});

// -------------------------------------------------------------
// Endpoints (category)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (category)
// -------------------------------------------------------------

// [Done]
// Add Category (admin)
// http://localhost:3000/category
app.post("/category/add", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let data = {
    d_category: req.body.category,
    d_description: req.body.description,
  };

  // Step 2 and 3: Process and respond
  Category.insert(data, function (err, result) {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res
          .status(422)
          .type("json")
          .send({ Error: "The category name provided already exists" })
          .end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    } else {
      if (result.affectedRows == 1) {
        res.status(204).end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    }
  });
});

// [Done]
// Show all categories
// http://localhost:3000/category
app.get("/category", printDebugInfo, function (req, res) {
  // Step 1: extraction

  // Step 2 and 3: Process and respond
  Category.findAll(function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result);
        res.end();
      } else {
        // Send error message response
        res.status(404).send("No categories found").end();
      }
    }
  });
});

// -------------------------------------------------------------
// Endpoints (product)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (product)
// -------------------------------------------------------------

// [Done]
// Add Product (admin)
// http://localhost:3000/product
app.post("/product/", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let data = {
    d_name: req.body.name,
    d_description: req.body.description,
    d_categoryid: req.body.categoryid,
    d_brand: req.body.brand,
    d_price: req.body.price.toFixed(2),
  };

  let dataJSON = {
    productid: 0,
  };

  // Step 2 and 3: Process and respond
  Product.insert(data, function (err, result) {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res
          .status(422)
          .type("json")
          .send({ Error: "The product already exists" })
          .end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    } else {
      if (result.affectedRows == 1) {
        dataJSON.productid = result.insertId;
        res.status(201).type("json").send(dataJSON).end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    }
  });
});

// [Done]
// Get product by name
// http://localhost:3000/search/name
app.post("/product/search/name", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let name = req.body.productName;

  console.log(`Product name: ${name}`);

  // Step 2 and 3: Process and respond
  Product.findByName(name, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No results found").end();
      }
    }
  });
});

// [Done]
// Get all products by date
// http://localhost:3000/search/asc
app.get("/product/search/creation/:order", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let order = req.params.order;

  if (order != "asc" && order != "desc") {
    res.status(200).end;
  }
  // Step 2 and 3: Process and respond
  Product.findAllByDate(order, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No results found").end();
      }
    }
  });
});

// [Done]
// Get all products by alphabetical order
// http://localhost:3000/search/asc
app.get(
  "/product/search/alphabetical/:order",
  printDebugInfo,
  function (req, res) {
    // Step 1: extraction
    let order = req.params.order;

    if (order != "asc" && order != "desc") {
      res.status(200).end;
    }
    // Step 2 and 3: Process and respond
    Product.findAllByName(order, function (err, result) {
      if (err) {
        // Send error message response
        res.status(500).send("Internal Server Error").end();
      } else {
        if (result) {
          // Report good news
          res.status(200).send(result).end();
        } else {
          // Send error message response
          res.status(404).send("No results found").end();
        }
      }
    });
  }
);

// [Done]
// Get all products by price order
// http://localhost:3000/search/price/asc
app.get("/product/search/price/:order", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let order = req.params.order;

  if (order != "asc" && order != "desc") {
    res.status(200).end;
  }
  // Step 2 and 3: Process and respond
  Product.findAllByPrice(order, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No results found").end();
      }
    }
  });
});

// [Done]
// Get product by brand
// http://localhost:3000/search/name
app.post("/product/search/brand", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let brand = req.body.productBrand;
  let search = req.body.search;

  // Step 2 and 3: Process and respond
  Product.findByBrand(brand, search, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such brand").end();
      }
    }
  });
});

// [Done]
// Get product by category with name
// http://localhost:3000/search/category
app.post("/product/search/category/", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let category = req.body.category;
  let search = req.body.search;

  // Step 2 and 3: Process and respond
  Product.findByCategory(category, search, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such ID!").end();
      }
    }
  });
});

// [Done]
// Get product by category
// http://localhost:3000/search/category
app.get("/interest/category/:categoryid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let cid = req.params.categoryid;

  if (isNaN(cid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();
  }

  // Step 2 and 3: Process and respond
  Product.findByCategoryFromInterest(cid, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such ID!").end();
      }
    }
  });
});

// [Done]
// Edit product (admin)
app.put("/product/edit/:id/", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin") {
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let pid = parseInt(req.params.id);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  let data = {
    d_name: req.body.name,
    d_desc: req.body.description,
    d_category: req.body.categoryid,
    d_brand: req.body.brand,
    d_price: req.body.price,
  };

  // Step 2 and 3: Process and respond
  Product.edit(pid, data, function (err, result) {
    if (err) {
      res.status(500).send("Internal Server Error").end();
    } else {
      /*
        affectedRows    changedRows
        0               0 <-- user not found
        0               1 <-- impossible
        1               0 <-- not updated
        1               1 <-- good news
      */
      if (result.affectedRows == 0) {
        res
          .status(404)
          .type("json")
          .send(`Message: Product(id:${uid}) not found...`)
          .end();
      } else if (result.changedRows == 1) {
        res.status(204).end();
      } else {
        res.status(422).send("The data already exists!").end();
      }
    }
  });
});

// [Done]
// Remove product and it's associated reviews(admin)
// http://localhost:3000/product/7
app.delete(
  "/product/delete/:id/",
  printDebugInfo,
  verifyToken,
  function (req, res) {
    // Step 1: extraction
    let pid = parseInt(req.params.id);

    if (isNaN(pid)) {
      res.statusCode = 400;
      res.send("Invalid Input");
      res.end();

      return;
    }

    // Step 2 and 3: Process and respond
    Product.delete(pid, function (err, result) {
      if (err) {
        // Send error message response
        res.status(500).send("Internal Server Error").end();
      } else {
        /*
        affectedRows    changedRows
        0               0 <-- user not found
        0               1 <-- impossible
        1               0 <-- not updated
        1               1 <-- good news
      */
        if (result.affectedRows == 0) {
          // Send error message response
          res.status(404).send("Product ID not found!").end();
        } else {
          res.status(204).end();
        }
      }
    });
  }
);

// [Done]
// Get product by ID
// http://localhost:3000/product/24/
app.get("/product/search/:id", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.id);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  console.log(`Product ID: ${pid}`);

  // Step 2 and 3: Process and respond
  Product.findByID(pid, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such ID!").end();
      }
    }
  });
});

// -------------------------------------------------------------
// Endpoints (brand)
// -------------------------------------------------------------

// [Done]
// Show all brands
// http://localhost:3000/brands
app.get("/brands", printDebugInfo, function (req, res) {
  Category.findAllBrands(function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result);
        res.end();
      } else {
        // Send error message response
        res.status(404).send("No categories found").end();
      }
    }
  });
});

// -------------------------------------------------------------
// Endpoints (review)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (review)
// -------------------------------------------------------------

// [Done]
// Add Product review (users)
// http://localhost:3000/product/12/review/
app.post(
  "/product/:id/review/",
  printDebugInfo,
  verifyToken,
  function (req, res) {
    // -------------------------------------------------------------
    // Authorisation check
    // -------------------------------------------------------------
    if (req.role != "admin" && req.role != "user") {
      let errData = {
        msg: "you are not authorised to perform this operation",
      };
      // 403 - Forbidden
      res.status(403).type("text").send(errData);
      return;
    }

    // Step 1: extraction
    let pid = parseInt(req.params.id);

    let data = {
      d_userid: req.body.userid,
      d_rating: req.body.rating,
      d_review: req.body.review,
    };

    let dataJSON = {
      reviewid: 0,
    };

    // Step 2 and 3: Process and respond
    Review.insert(pid, data, function (err, result) {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res
            .status(422)
            .type("json")
            .send({ Error: "The product review already exists" })
            .end();
        } else {
          res.status(500).type("json").send("Internal Server Error").end();
        }
      } else {
        if (result.affectedRows == 1) {
          dataJSON.reviewid = result.insertId;
          res.status(201).type("json").send(dataJSON).end();
        } else {
          res.status(500).type("json").send("Internal Server Error").end();
        }
      }
    });
  }
);

// [Done]
// Show reviews
// http://localhost:3000/product/13/reviews
app.get("/product/:id/reviews", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.id);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  Review.showReviews(pid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        res.status(404).type("json").send("No reviews found...").end();
      }
    }
  });
});

// [Done]
// Get review by ID
// http://localhost:3000/review/24/
app.get("/review/:rid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let rid = parseInt(req.params.rid);

  if (isNaN(rid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  console.log(`Product ID: ${rid}`);

  // Step 2 and 3: Process and respond
  Review.findByID(rid, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        // Send error message response
        res.status(404).send("No such ID!").end();
      }
    }
  });
});

// [Done]
// Add image to product listing (admin)
app.put(
  "/user/addimage/:userid",
  prodImgupload.single("picture"),
  printDebugInfo,
  verifyToken,
  function (req, res) {
    // -------------------------------------------------------------
    // Authorisation check
    // -------------------------------------------------------------
    if (req.role != "admin") {
      let errData = {
        msg: "you are not authorised to perform this operation",
      };
      // 403 - Forbidden
      res.status(403).type("text").send(errData);
      return;
    }

    // Step 1: extraction
    let uid = parseInt(req.params.userid);
    console.log(req.file);
    if (isNaN(uid)) {
      res.statusCode = 400;
      res.send("Invalid Input");
      res.end();
      return;
    } else if (req.file === undefined) {
      res.statusCode = 500;
      res.send("Internal Server Error");
      res.end;
      return;
    } else {
      // Step 2 and 3: Process and respond
      User.addImageById(uid, req.file.path, function (err, result) {
        if (err) {
          res.status(500).type("json").send("Internal Server Error").end();
        } else {
          res.status(201).end();
        }
      });
    }
  }
);

// [Done]
// Show Image
app.get("/user/showimage/:userid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let uid = parseInt(req.params.userid);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  User.getImageById(uid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      console.log(result[0].profile_pic_url);
      let abImgPath = path.resolve(result[0].profile_pic_url);
      res.status(201).sendFile(abImgPath);
    }
  });
});

// -------------------------------------------------------------
// Endpoints (interests)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (interests)
// -------------------------------------------------------------

// [Done]
// Add Category interest (user)
// http://localhost:3000/interest/28
app.post("/interest/:userid", printDebugInfo, verifyToken, function (req, res) {
  // -------------------------------------------------------------
  // Authorisation check
  // -------------------------------------------------------------
  if (req.role != "admin" && req.role != "user") {
    console.log(req.role == "admin");
    let errData = {
      msg: "you are not authorised to perform this operation",
    };
    // 403 - Forbidden
    res.status(403).type("text").send(errData);
    return;
  }

  // Step 1: extraction
  let uid = parseInt(req.params.userid);

  let categoryids = req.body.categoryids;

  let data = categoryids.split(",");

  // Step 2 and 3: Process and respond
  Interest.insert(uid, data, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result.affectedRows == 1) {
        res.status(201).end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    }
  });
});

// [Done]
// Get category interests
// http://localhost:3000/users/interests/1
app.get("/users/interests/:userID", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let uid = parseInt(req.params.userID);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  User.getInterests(uid, function (err, result) {
    let dataJSON = {
      status: 0,
      message: "",
    };

    if (err) {
      dataJSON.message = "bad..";

      res.status(500).type("json").send(dataJSON).end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result);
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    }
  });
});

// [Done]
// Delete category interests
app.delete(
  "/interest/del/:userid",
  printDebugInfo,
  verifyToken,
  function (req, res) {
    // -------------------------------------------------------------
    // Authorisation check
    // -------------------------------------------------------------
    if (req.role != "admin" && req.role != "user") {
      let errData = {
        msg: "you are not authorised to perform this operation",
      };
      // 403 - Forbidden
      res.status(403).type("text").send(errData);
      return;
    }

    // Step 1: extraction
    let uid = parseInt(req.params.userid);

    if (isNaN(uid)) {
      res.statusCode = 400;
      res.send("Invalid Input");
      res.end();

      return;
    }

    // Step 2 and 3: Process and respond
    Interest.delete(uid, function (err, result) {
      if (err) {
        // Send error message response
        res.status(500).send("Internal Server Error").end();
      } else {
        if (result.affectedRows == 0) {
          // Send error message response
          res.status(404).send("User ID not found!").end();
        } else {
          res.status(200).send("Interests Successfully Deleted.").end();
        }
      }
    });
  }
);
// -------------------------------------------------------------
// Endpoints (Image Uploading)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (Image uploading)
// -------------------------------------------------------------

// [Done]
// Add image to product listing (admin)
app.put(
  "/product/addimage/:itemid",
  pfpupload.single("picture"),
  printDebugInfo,
  verifyToken,
  function (req, res) {
    // -------------------------------------------------------------
    // Authorisation check
    // -------------------------------------------------------------
    if (req.role != "admin") {
      let errData = {
        msg: "you are not authorised to perform this operation",
      };
      // 403 - Forbidden
      res.status(403).type("text").send(errData);
      return;
    }

    // Step 1: extraction
    let pid = parseInt(req.params.itemid);
    console.log(req.file);
    if (isNaN(pid)) {
      res.statusCode = 400;
      res.send("Invalid Input");
      res.end();
      return;
    } else if (req.file === undefined) {
      res.statusCode = 500;
      res.send("Internal Server Error");
      res.end;
      return;
    } else {
      // Step 2 and 3: Process and respond
      Product.addImageById(pid, req.file.path, function (err, result) {
        if (err) {
          res.status(500).type("json").send("Internal Server Error").end();
        } else {
          res.status(201).end();
        }
      });
    }
  }
);

// [Done]
// Show Image
app.get("/product/showimage/:itemid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.itemid);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  Product.getImageById(pid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      console.log(result[0].picture);
      let abImgPath = path.resolve(result[0].picture);
      res.status(201).sendFile(abImgPath);
    }
  });
});

// -------------------------------------------------------------
// Endpoints (Promotional Events)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (Promotional Events)
// -------------------------------------------------------------

// [Done]
// Show all promos
// http://localhost:3000//promo/getall
app.get("/promotion/getall", printDebugInfo, function (req, res) {
  // Step 1: extraction

  // Step 2 and 3: Process and respond
  Promotion.showAllPromos(function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        res.status(404).type("json").send("No promotions found...").end();
      }
    }
  });
});

// -------------------------------------------------------------
// Exports
// -------------------------------------------------------------
module.exports = app;
