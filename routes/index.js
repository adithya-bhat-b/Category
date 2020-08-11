const router = require('express').Router();
const Controller = require('../controllers');

// category routes
router.get("/category/get-all", Controller.getCategories);
router.post("/category/add", Controller.createCategory);
router.get("/product/get-by-category/:categoryId", Controller.getProductsForCategory);
router.patch("/product/update", Controller.updateProduct);
router.put("/product/add-to-categories", Controller.addProductToCategories);

module.exports = router;