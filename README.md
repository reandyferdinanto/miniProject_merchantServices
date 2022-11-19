# miniProject_merchantServices
Mini Project Merchant Services by Reandy

## Description
Backend API which provided some API for Merchant Services application 
which included :

```node
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.users);

router.post("/products", productController.submitProduct);
router.delete("/products/:id", productController.deleteProductbyId);
router.put("/products/:id", productController.updateProductbyId);
router.get("/products", productController.allProducts);
```

## Installation
```powershell
$ npm init
$ npm install express dotenv mysql2 express-session jsonwebtoken 
```

## for Auto Start Application
``` powershell
$ npm install nodemon
```

![login](/login_jpg/login.jpg)
