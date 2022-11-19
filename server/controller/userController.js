const pool = require("../database");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  if (req.body.username != "" && req.body.password != "") {
    const { username, password, address, phone_number } = req.body;
    const selectSql = `SELECT username FROM users WHERE username = "${username}"`;
    const selects = pool.query(selectSql, (err, result) => {
      console.log(result);
      if (result && result.length >= 1) {
        return res.status(400).json({
          message: `username already registered`,
        });
      } else {
        const registersSql = `INSERT INTO users (username, password, address, phone_number) VALUES ("${username}", "${password}", "${address}", "${phone_number}")`;
        const registers = pool.query(registersSql, (err, result) => {
          return res.json({
            message: `Hi  ${username}  Your Registration is Succesful`,
          });
        });
      }
    });
  } else {
    return res.status(400).json({
      message: `username & password must be filled`,
    });
  }
};

exports.login = (req, res) => {
  if (req.body.username != "" && req.body.password != "") {
    const { username, password } = req.body;
    const selectSql = `SELECT username FROM users WHERE username = "${username}"`;
    const selectLogin = pool.query(selectSql, (err, result) => {
      if (result && result.length >= 1) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.status(400).json({
          message: `Welcome ${username} to Merchant Service`,
          token: token,
        });
      } else {
        console.log(req.body.username);
        return res.json({
          message: `Please Register your Account`,
        });
      }
    });
  }
};

exports.users = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("authorization").split(" ")[1],
      process.env.JWT_SECRET
    );
    const query = "SELECT * FROM merchant_service.users";
    const users = await pool
      .promise()
      .query(query)
      .then(([rows]) => {
        res.status(200).send(rows);
      });
  } catch (err) {
    res.json({
      message: "Please Verify your Account",
    });
  }
};
