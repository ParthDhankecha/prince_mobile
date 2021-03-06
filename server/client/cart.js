const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const auth = require("../auth");

router.post("/add-cart", auth.verifyToken, (req, res) => {
  let cart = req.body.cart;
  //  let sql=""
  sql =
    "replace into cart(cart_id,variant_id,quantity,mobile_required,mobile_id,color_id,size_id) values";
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity > 0) {
      let color = 0;
      if (cart[i].color_id) {
        color = cart[i].color_id;
      }
      let size = 0;
      if (cart[i].size_id && cart[i].size_id != null) {
        size = cart[i].size_id;
      }
      console.log("size ", size);
      console.log("color ", color);
      if (i == cart.length - 1) {
        sql +=
          "(" +
          req.userId +
          "," +
          cart[i].variant_id +
          "," +
          cart[i].quantity +
          "," +
          cart[i].mobile_required +
          "," +
          cart[i].mobile_id +
          "," +
          color +
          "," +
          size +
          ");";
      } else {
        sql +=
          "(" +
          req.userId +
          "," +
          cart[i].variant_id +
          "," +
          cart[i].quantity +
          "," +
          cart[i].mobile_required +
          "," +
          cart[i].mobile_id +
          "," +
          color +
          "," +
          size +
          "),";
      }
    } else {
      res.json({ status: "0", message: "Please enter quantity > 0" });
      break;
    }
  }

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "Cart is already added."
      });
    } else {
      res.status(200).json({
        status: "1",
        message: "Cart is added successfully."
      });
    }
  });
});

router.put(
  "/update-quantity",
  [check("item_id").isNumeric(), check("quantity").isNumeric()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let data = req.body;
      let sql =
        "update cart set quantity=" +
        data.quantity +
        " where item_id=" +
        data.item_id +
        " and cart_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Provide valid cart data" });
        } else {
          res.status(200).json({
            status: "1",
            message: "Cart's quantity updated successfully."
          });
        }
      });
    }
  }
);

router.post(
  "/remove-cart-item",
  [check("item_id").isNumeric()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let item_id = req.body.item_id;
      let sql =
        "delete from cart where item_id=" +
        item_id +
        " and cart_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: "0", message: "Provide valid cart" });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Cart item removed successfully." });
        }
      });
    }
  }
);

router.post("/update-cart", auth.verifyToken, (req, res) => {
  let data = req.body.cart;
  for (let i = 0; i < data.length; i++) {
    let sql =
      "update cart set quantity=" +
      data[i].quantity +
      " where item_id=" +
      data[i].item_id;
    con.query(sql);
  }
  res.status(200).json({ status: "1", message: "Cart updated sucessfully." });
});

router.post(
  "/remove-whole-cart",
  [check("variant_id").isNumeric()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let item_id = req.body.variant_id;
      let sql =
        "delete from cart where variant_id=" +
        item_id +
        " and cart_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: "0", message: "Provide valid cart" });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Cart removed successfully." });
        }
      });
    }
  }
);

router.get("/get-cart-detail", auth.verifyToken, (req, res) => {
  let sql =
    "select c.item_id,c.variant_id,v.name,SUM(c.quantity) as total_quantity,v.list_image,v.price,v.discount from cart c, product_variant v where c.cart_id=" +
    req.userId +
    " and  c.variant_id=v.variant_id group by c.variant_id";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: "0", message: "Enter valid user token" });
    } else {
      let image;
      for (let i = 0; i < result.length; i++) {
        result[i].price = result[i].total_quantity * result[i].price;
        image = JSON.parse(result[i].list_image);
        if (image.length > 0) {
          result[i].list_image = process.env.LISTIMAGE + image[0];
        } else {
          result[i].list_image = "";
        }
      }
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res.status(200).json({
        status: "1",
        message: "Getting Cart Details Successfully.",
        data: result
      });
    }
  });
});

router.post(
  "/get-cart-item-detail",
  [check("variant_id").isNumeric(), check("mobile_required").isBoolean()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let data = req.body;
      let sql;
      if (data.mobile_required) {
        sql =
          "select c.item_id,c.variant_id,v.name,c.quantity,c.mobile_id,v.is_cod,vm.quantity as max_qty,v.min_qty,v.thumbnail,vm.price,vm.discount,m.model_name,v.image_required,pc.name as category from cart c,category pc,product p, mobile_models m,variant_mobile vm,product_variant v where c.variant_id=v.variant_id and c.mobile_id=m.model_id and vm.variant_id=c.variant_id and vm.mobile_id=c.mobile_id and c.variant_id=" +
          data.variant_id +
          " and c.cart_id=" +
          req.userId +
          " and p.product_id=v.product_id and p.category_id=pc.category_id";
      } else {
        sql =
          "select c.item_id,c.variant_id,v.name,c.quantity,c.mobile_id,v.is_cod,v.quantity as max_qty,v.min_qty,v.thumbnail,v.price,v.discount,v.image_required,pc.name as category from cart c,category pc,product p,variant v where c.variant_id=v.variant_id and c.cart_id=" +
          req.userId +
          " and c.variant_id=" +
          data.variant_id +
          " and p.product_id=v.product_id and p.category_id=pc.category_id";
      }
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: 0, message: "Please select valid cart product" });
        } else {
          let net_total = 0;
          for (let i = 0; i < result.length; i++) {
            if (!data.mobile_required) {
              result[i].model_name = "";
            }
            result[i].mobile_required = data.mobile_required;
            let images = JSON.parse(result[i].thumbnail);
            if (images.length > 0) {
              result[i].thumbnail = process.env.THUMBNAIL + images[0];
            } else {
              result[i].thumbnail = "";
            }
            result[i].mrp =
              result[i].price + (result[i].price * result[i].discount) / 100;
            net_total = net_total + result[i].price * result[i].quantity;
            // result[i].total_price=result[i].price*
          }
          let other_details = { is_code: "0" };
          if (result.length > 0) {
            other_details = {
              is_cod: result[0].is_cod.toString()
            };
          }
          let json = JSON.stringify(result);
          result = JSON.parse(json, (key, val) =>
            typeof val !== "object" && val !== null ? String(val) : val
          );
          sql = "select id,code,description from promocode";
          con.query(sql, (err, offers) => {
            if (err) {
              console.log(err);
              res.status(200).json({
                status: "0",
                message: "Cart details not found. Try again later."
              });
            } else {
              json = JSON.stringify(offers);
              offers = JSON.parse(json, (key, val) =>
                typeof val !== "object" && val !== null ? String(val) : val
              );
              sql = "select meta_value from meta where id=1";
              con.query(sql, (err, cod) => {
                other_details.cod_charge = cod[0].meta_value;
                let image = 0;
                if (result.length > 0) {
                  image = result[0].image_required;
                }
                res.status(200).json({
                  status: 1,
                  message: "Getting cart product detail successfuly.",
                  cart_data: result,
                  offers_details: offers,
                  other_details: other_details,
                  image_required: image,
                  net_total: net_total.toString()
                });
              });
            }
          });
        }
      });
    }
  }
);

router.post(
  "/apply-promocode",
  [check("promo_id").isNumeric(), check("price").isNumeric()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      console.log(req.body);
      let promo = req.body.promo_id;
      if (!req.body.variant_id) {
        res
          .status(200)
          .json({ status: "0", message: "Please provide variant id" });
        return;
      }
      let sql =
        "select accept_promocode from product_variant where variant_id=" +
        req.body.variant_id;
      con.query(sql, (err, result) => {
        if (err) {
          res.json({
            status: "0",
            message: "Promocode not applied. Please try again later."
          });
        } else {
          if (result && result.length < 1) {
            res.json({ status: "0", message: "Please seletc valid product" });
          } else {
            if (result[0].accept_promocode) {
              sql =
                "select count(promo_id) as count,(select max_attempt from promocode where id=" +
                promo +
                ") as max_attempt from customer_order where promo_id=" +
                promo +
                " and user_id=" +
                req.userId;
              con.query(sql, (err, result) => {
                if (err) {
                  console.log(err);
                  res
                    .status(200)
                    .json({ status: "0", message: "Promocode not applied." });
                } else {
                  if (result.length > 0) {
                    if (result[0].count < result[0].max_attempt) {
                      sql = "select * from promocode where id=" + promo;
                      con.query(sql, (err, promoData) => {
                        if (promoData.length > 0) {
                          if (promoData[0].min_limit <= req.body.price) {
                            let discount;
                            if (promoData[0].discount_type == 1) {
                              discount = promoData[0].max_discount;
                            } else {
                              discount =
                                (req.body.price * promoData[0].discount) / 100;
                              if (discount > promoData[0].max_discount) {
                                discount = promoData[0].max_discount;
                              }
                            }
                            let finalAmount = req.body.price;

                            finalAmount = finalAmount - discount;
                            if (finalAmount < 0) {
                              finalAmount = 0;
                            }
                            res.status(200).json({
                              status: "1",
                              message: "Promocode applied successfully.",
                              payable_price: finalAmount.toString(),
                              discount: discount,
                              promocode: promoData[0].code
                            });
                          } else {
                            res.status(200).json({
                              status: "0",
                              message:
                                "Your cart amount is not sufficient for applying the promocode"
                            });
                          }
                        } else {
                          res.status(200).json({
                            status: "0",
                            message: "Please enter valid promocode."
                          });
                        }
                      });
                    } else {
                      res.status(200).json({
                        status: "0",
                        message: "You already used this promocode"
                      });
                    }
                  } else {
                    res.status(200).json({
                      status: "0",
                      message: "Please enter valid promocode."
                    });
                  }
                }
              });
            } else {
              res.json({
                status: "0",
                message: "Promocode is not applicable to selected product"
              });
            }
          }
        }
      });
    }
  }
);

router.post(
  "/get-delivery-charge",
  [check("pincode").isNumeric()],
  auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let product = req.body.product;

      res.status(200).json({
        status: "1",
        message: "Getting the delivery charge successfully.",
        deliveryCharge: "70"
      });
    }
  }
);

module.exports = router;
