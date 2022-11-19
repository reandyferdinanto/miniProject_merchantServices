const express = require("express");
const mysql = require("mysql2");

const pool = require("./Server/database");
const routes = require("./Server/routes");

const app = express();

const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());

app.use("/", routes);

pool.getConnection((err) => {
  if (!err) console.log("DB Connection Succeded");
  else console.log("DB Connection Failed");
});

app.listen(port, (err) => {
  if (!err) console.log(`Listening to port ${port}`);
  else console.log(err);
});
