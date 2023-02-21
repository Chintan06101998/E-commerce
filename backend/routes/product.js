const express = require("express");
const router = express.Router();

const { getProdctById, createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");
const { route } = require("./auth");



// all of the params
router.param("userID", getUserById);
//console.log("888"+getUserById)
router.param("productID", getProdctById);

// actual routes
//create routes
router.post("/product/create/:userID", isSignedIn,isAuthenticated,isAdmin, createProduct);

//read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete routes
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)

//update routes
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)



//listing routes
router.get("/products", getAllProducts)


router.get("products/categories", getAllUniqueCategories)

module.exports = router;