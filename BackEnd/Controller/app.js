// Considerations: Cart function? Checkout function? search promotion?

console.log("----------------------------");
console.log("Assignment1 > controller > app.js");
console.log("----------------------------");

// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
const path = require("path");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// Multer helps to process form-data elements, like how body-parser helps with process body elements/data
// Sub Section For Multer Intro
const multer = require("multer");
const uploadStorage = multer.diskStorage({
  // Sets storage location
  destination: function (req, file, cb) {
    cb(null, "../uploads");
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
const upload = multer({
  storage: uploadStorage,
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

// -------------------------------------------------------------
// Endpoints (users)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (users)
// -------------------------------------------------------------
// Login
// Logout
// Add user(On sign-up)
// Show all users(admin)
// Find user by ID(admin)
// Edit user

// [Working soon]
// Login

// [Working soon]
// Logout

// [Working]
// Add User
// http://localhost:3000/users/
app.post("/users/", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let data = {
    d_userName: req.body.username,
    d_email: req.body.email,
    d_contact: req.body.contact,
    d_password: req.body.password,
    d_type: req.body.type,
    d_profilePic: req.body.profile_pic_url,
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
// Show all users
// http://localhost:3000/users/
app.get("/users/", printDebugInfo, function (req, res) {
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
// Find user by ID
// http://localhost:3000/users/24/
app.get("/users/:id/", printDebugInfo, function (req, res) {
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
// Edit User
// http://localhost:3000/users/28
app.put("/users/:id/", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let uid = parseInt(req.params.id);

  if (isNaN(uid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  let data = {
    d_userName: req.body.username,
    d_email: req.body.email,
    d_contact: req.body.contact,
    d_password: req.body.password,
    d_type: req.body.type,
    d_profilePic: req.body.profile_pic_url,
  };

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

// -------------------------------------------------------------
// Endpoints (category)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (category)
// -------------------------------------------------------------
// Add category
// Show all categories

// [Working]
// Add Category
// http://localhost:3000/category
app.post("/category", printDebugInfo, function (req, res) {
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

// [Working]
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
// Add product
// Get product by name
// Get product by brand
// Get products by category
// Edit product
// Remove product

// [Working]
// Add Product
// http://localhost:3000/product
app.post("/product/", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let data = {
    d_name: req.body.name,
    d_description: req.body.description,
    d_categoryid: req.body.categoryid,
    d_brand: req.body.brand,
    d_price: req.body.price,
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

// [Working]
// Get product by name

// [Working]
// Get product by brand

// [Working]
// Get product by category

// [Working]
// Edit product

// [Working]
// Remove product and it's associated reviews
// http://localhost:3000/product/7
app.delete("/product/:id/", printDebugInfo, function (req, res) {
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
});

// [Done]
// Get product by ID
// http://localhost:3000/product/24/
app.get("/product/:id", printDebugInfo, function (req, res) {
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
// Endpoints (review)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (review)
// -------------------------------------------------------------
// Add new reviews
// Show reviews

// [Working]
// Add Product review
// http://localhost:3000/product/12/review/
app.post("/product/:id/review/", printDebugInfo, function (req, res) {
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
});

// [Working]
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

// -------------------------------------------------------------
// Endpoints (interests)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (interests)
// -------------------------------------------------------------
// Add category interest
// Get interests

// [Working]
// Add Category interest
// http://localhost:3000/interest/28
app.post("/interest/:userid", printDebugInfo, function (req, res) {
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

// [Working]
// Get category interests

// -------------------------------------------------------------
// Endpoints (Image Uploading)
// -------------------------------------------------------------

// -------------------------------------------------------------
// CA2 Needed Endpoints (Image uploading)
// -------------------------------------------------------------
// Upload image(admin) while creating product
// Show image with getting product

// [Working]
// Add image to existing product listing
app.put(
  "/product/addimage/:itemid",
  upload.single("picture"),
  printDebugInfo,
  function (req, res) {
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

// [Working]
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
// Add promotion
// Search for promotions(?)
//    - By item
// Show all promotions
// Remove promotions(admin)

// [Working]
// Add promotion
// http://localhost:3000/promotion/add
app.post("/promotion/addpromotion", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let data = {
    d_productid: req.body.productid,
    d_promotion: req.body.promotion,
    d_discountamount: req.body.discountamount,
    d_description: req.body.description,
    d_promostart: req.body.promostart,
    d_promoend: req.body.promoend,
    d_duration: req.body.duration,
  };
  // Step 2 and 3: Process and respond
  Promotion.insert(data, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result.affectedRows == 1) {
        res
          .status(201)
          .type("json")
          .send(
            "Promotion Successfully Created!\nPromotion ID: " +
              JSON.stringify(result.insertId)
          )
          .end();
      } else {
        res.status(500).type("json").send("Internal Server Error").end();
      }
    }
  });
});

// [Working]
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

// [Working]
// Show promo by itemid
// http://localhost:3000/promotion/byitem/13
app.get("/promotion/byitem/:itemid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.itemid);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();
    return;
  }

  // Step 2 and 3: Process and respond
  Promotion.findByProductID(pid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        res
          .status(404)
          .type("json")
          .send("No promotions for product found.")
          .end();
      }
    }
  });
});

// [Working]
// Remove promotion
// http://localhost:3000/product/7
app.delete("/promotion/remove/:promoid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.promoid);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();

    return;
  }

  // Step 2 and 3: Process and respond
  Promotion.deletePromo(pid, function (err, result) {
    if (err) {
      // Send error message response
      res.status(500).send("Internal Server Error").end();
    } else {
      if (result.affectedRows == 0) {
        // Send error message response
        res.status(404).send("Promotion ID not found!").end();
      } else {
        res.status(200).send("Product Successfully Deleted.").end();
      }
    }
  });
});

// [Done]
// Show promo by promoid
// http://localhost:3000/promotion/promotionid/7
app.get("/promotion/promotionid/:promoid", printDebugInfo, function (req, res) {
  // Step 1: extraction
  let pid = parseInt(req.params.promoid);

  if (isNaN(pid)) {
    res.statusCode = 400;
    res.send("Invalid Input");
    res.end();
    return;
  }

  // Step 2 and 3: Process and respond
  Promotion.findByPromoID(pid, function (err, result) {
    if (err) {
      res.status(500).type("json").send("Internal Server Error").end();
    } else {
      if (result) {
        // Report good news
        res.status(200).send(result).end();
      } else {
        res.status(404).type("json").send("No such promotion found.").end();
      }
    }
  });
});
// -------------------------------------------------------------
// Exports
// -------------------------------------------------------------
module.exports = app;
