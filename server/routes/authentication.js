const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const con = require("../database-connection");

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

router.post(
  "/loginAdmin",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hv");
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let user = req.body;
      let sql = "select * from admin where email='" + user.email + "'";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            if (
              result[0].password.toLowerCase() === user.password.toLowerCase()
            ) {
              let payload = { subject: result[0].id };
              let token = jwt.sign(payload, "MysupersecreteKey");
              res.status(200).json({
                status: 200,
                message: "User is logged in successfully",
                token: token
              });
            } else {
              res.status(200).json({
                status: 400,
                message: "Username and Password are not matched"
              });
            }
          } else {
            res
              .status(200)
              .json({ status: 400, message: "Username not found" });
          }
        }
      });
    }
  }
);

router.post(
  "/registerAdmin",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
    check("mobile").isNumeric(),
    check("full_name").isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let user = req.body;

      let sql =
        "insert into admin(email,password,mobile,name) values('" +
        user.email +
        "','" +
        md5(user.password) +
        "'," +
        user.mobile +
        ",'" +
        user.full_name +
        "')";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let payload = { subject: result.insertId };
          let jwt_token = jwt.sign(payload, "MysupersecreteKey");
          res.status(200).send({
            status: 200,
            message: "User registered successfully",
            token: jwt_token
          });
        }
      });
    }
  }
);

module.exports = router;
