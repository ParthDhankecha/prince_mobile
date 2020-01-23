const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;

/** Verify the user token */

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

router.get("/get-promocode", verifyToken, (req, res) => {
  let sql="select * from  promocode";
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err);
      res.status(200).json({status:400, message:"Promocodes not found"});
    } else {
      res.status(200).json({status:200, message:"Promocodes getting successfully.", promocodes:result});
    }
  });
});

module.exports = router;