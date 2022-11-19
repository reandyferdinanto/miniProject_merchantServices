const pool = require("../database");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const jwt = require("jsonwebtoken");

exports.submitProduct = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("authorization").split(" ")[1],
      process.env.JWT_SECRET
    );
    const { prodName, prodQty, prodPrice } = req.body;
    const prodQuery = `INSERT INTO products (prodName, prodQty, prodPrice)
   VALUES ("${prodName}", "${prodQty}", "${prodPrice}")`;
    const query = await pool
      .promise()
      .query(prodQuery)
      .then(([rows]) => {
        res.status(200).send({
          message: `${prodName} is submited`,
        });
      });
    console.log({ message: `${prodName} is submited` });
  } catch (err) {
    res.json({
      message: "Please Verify your Account",
    });
  }
};

exports.deleteProductbyId = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("authorization").split(" ")[1],
      process.env.JWT_SECRET
    );
    const { prodName } = req.body;
    const queryDelete = `DELETE FROM products WHERE productID = ?`;
    const deleteProduct = await pool
      .promise()
      .query(queryDelete, [req.params.id])
      .then((rows, result) => {
        res.status(200).send({
          message: `deleted successfully`,
        });
      });
  } catch (err) {
    res.json({
      message: "Please Verify your Account",
    });
  }
};

exports.updateProductbyId = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("authorization").split(" ")[1],
      process.env.JWT_SECRET
    );
    // const { productID, prodName, prodQty, prodPrice } = req.body;
    const updateQuery =
      "UPDATE products SET prodName = ?, prodQty = ?, prodPrice = ? WHERE productID = ?";
    const query = await pool
      .promise()
      .query(updateQuery, [
        req.body.prodName,
        req.body.prodQty,
        req.body.prodPrice,
        req.params.id,
      ])
      .then((rows, result) => {
        res.status(200).send({
          message: `Product update successfully`,
        });
      });
  } catch (err) {
    res.json({
      message: "Please Verify your Account",
    });
    res.send(err);
  }
};

exports.allProducts = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("authorization").split(" ")[1],
      process.env.JWT_SECRET
    );
    const queryProducts = "SELECT * FROM products";
    const users = await pool
      .promise()
      .query(queryProducts)
      .then(([rows]) => {
        res.status(200).send(rows);
      });
  } catch (err) {
    res.json({
      message: "Please Verify your Account",
    });
  }
};
