const express = require("express");//to include expree framework
const ProductController = require("../controllers/productController");
//to acess the function or product controller

const router = express.Router();//


//used to new express router for product router
//GET it is usedto access the product
router.get("/", ProductController.getAllProducts);//used to acess all product
router.get("/search", ProductController.searchProducts);//search the product by id
router.get("/low-stock", ProductController.getLowStockProducts);//search product stock number 
router.get("/inventory-value", ProductController.getInventoryValue);
//to search all total values
router.get("/category/:category", ProductController.getProductByCategory);
//search by categoty name
router.get("/price/:price", ProductController.getProductByPrice)
//search product by price
router.get("/:id", ProductController.getProductById);
//POST it is uesd to add product 
router.post("/", ProductController.createProduct);//used to add new product
router.put("/:id", ProductController.updateProduct);
router.patch("/:id",ProductController.patchProduct);
//used to update the product 
//DELETE
router.delete("/:id", ProductController.deleteProduct);
//delete the product by accessing id
module.exports = router;

