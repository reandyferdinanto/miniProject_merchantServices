const express = require("express");
const router = express.Router();
const userController = require("./Controller/userController");
const productController = require("./Controller/productController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.users);

router.post("/products", productController.submitProduct);
router.delete("/products/:id", productController.deleteProductbyId);
router.put("/products/:id", productController.updateProductbyId);
router.get("/products", productController.allProducts);
module.exports = router;
