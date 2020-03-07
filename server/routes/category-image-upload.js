const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const limit = 10;
// var upload=multer({dest:'../../Images/product_images'});
var app = express();
const con = require("../database-connection");

app.use(express.static("../../Images/product_images"));

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request! Header Not Found");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized Request! Token Not Found");
  }
  let payload = jwt.verify(token, "MysupersecreteKey");

  if (!payload) {
    return res.status(401).send("Unauthorized Request! Token is not Correct");
  }
  req.userId = payload.subject;
  next();
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../", "assets/categories"));
  },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    var filename = file.originalname + "-" + Date.now() + ext;
    let sql =
      "select promo_images from category where category_id=" +
      req.params.variant_id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = 0;
        let images = new Array();
        images = JSON.parse(result[0].promo_images);

        try {
          if (req.params.image_name) {
            for (let i = 0; i < images.length; i++) {
              if (images[i] === req.params.image_name) {
                images[i] = filename.toString();
                let filepath =
                  path.join(__dirname, "../", "assets/categories") + images[i];
                check = 1;
                break;
              }
            }
            fs.unlinkSync(filepath);
          }
        } catch (e) {
          console.log("update Image");
        }
        if (check == 0) {
          images[0] = filename.toString();
        }

        sql =
          "update category set promo_images='" +
          JSON.stringify(images) +
          "' where category_id=" +
          req.params.variant_id;
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });

router.post(
  "/upload-image/:variant_id",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    res.status(200).json({ status: 200, message: "Category Image Uploaded" });

    // console.log(req.files[0].path)
  }
);

router.post(
  "/editImageUpload/:variant_id/:image_name",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    res.status(200).json({ status: 200, message: "Category Image Uploaded" });
  }
);

module.exports = router;
