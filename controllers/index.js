const CategotySchema = require("../models/category");
const ProductSchema = require("../models/product");

module.exports = {
    //Create category controller
    createCategory: async (req, res) => {
        let reqBody = req.body;
        if (typeof reqBody == "string"){
            reqBody = JSON.parse(reqBody);
        }
        const response = {
            status: "OK",
            data: null
        }
        const {name, description, categories, products} = reqBody;
        if (!name){
            console.info("Name has to be given.")
            return res.json({
                status: "ERROR",
                data: "Name has to be defined"
            });
        }
        const categoryObj = {name, ...(description ? { description }:{})}
        const childCategoryObjs = [];
        
        if (categories){
            for (let categoryId of categories){
                try{
                    const childCategoryObj = await CategotySchema.findById(categoryId);
                    childCategoryObjs.push(childCategoryObj);
                }
                catch(err){
                    console.error(`Category is not found for category id: ${categoryId}, error: ${err}`)
                    // do nothing
                    continue;
                }
            }
            categoryObj["child_categories"] = childCategoryObjs;
        }
        const productObjs = [];
        if (products){
            for (let productId of products){
                try{
                    const productObj = await ProductSchema.findById(productId);
                    productObjs.push(productObj);
                }
                catch(err){
                    console.error(`Product is not found for product id: ${productId}, Error: ${err}`)
                    // do nothing
                    continue;
                }
            }
            categoryObj["products"] = productObjs;
        }
        try{
            const created_category = await CategotySchema.create(categoryObj);
            response["data"] = created_category;
        }
        catch(err){
            const err_msg = `Error creating a category, Error: ${err}`
            console.error(err_msg);
            response["status"] = "ERROR" ;
            response["data"] = err_msg;
        }
        
        return res.json(response);
    },
    // Get all the categories
    getCategories: async(req, res) => {
        const response = {
            status: "OK",
            data: null
        }
        try{
            const categories = await CategotySchema.find().select("-products");
            response["data"] = categories;
        }
        catch(err){
            const err_msg = `Error fetching all the categories, Error:${err}`
            console.error(err_msg);
            response["status"] = "ERROR";
            response["data"] = err_msg;
        }
        return res.json(response);
    },
    // Get all the products for a category
    getProductsForCategory: async(req, res) => {
        const response = {
            status: "OK",
            data: null
        }
        const { categoryId } = req.params;
        if (! categoryId){
            console.info("Please pass category id param.");
            return res.json({
                status: "ERROR",
                data: "Please pass category id param."
            })
        }
        try{
            const categories = await CategotySchema.findById(categoryId).populate("products");
            response["data"] = { products: categories.products };
        }
        catch(err){
            const err_msg = `Unable to find prodcuts for category with id: ${categoryId}, Error:${err}`
            console.error(err_msg);
            response["status"] = "ERROR";
            response["data"] = err_msg;
        }
        return res.json(response);
    },
    // Add products to a category
    addProductToCategories: async (req, res) => {
        let reqBody = req.body;
        if (typeof reqBody == "string"){
            reqBody = JSON.parse(reqBody);
        }
        const response = {
            status: "OK",
            data: null
        }
        const {name, price, brand, categories} = reqBody;
        if (!name || !price){
            console.info("Name and price has to be defined");
            return res.json({
                status: "ERROR",
                data: "Name and price has to be defined"
            });
        }
        const data = {};
        const productObj = {name, price,  ...(brand ? { brand }:{})};
        let createdProduct;
        try{
            createdProduct = await ProductSchema.create(productObj);
            data["product"] = createdProduct;
            data["addedCategories"] = [];
        }
        catch(err){
            const err_msg = `Error creating the product: ${productObj}, Error:${err}`
            console.error(err_msg);
            return res.json({
                "status": "ERROR",
                "data": err_msg
            })
        }
        if (categories){
            const addedCategories = []
            for (let categoryId of categories){
                try{
                    const childCategoryObj = await CategotySchema.findById(categoryId);
                    childCategoryObj.products.push(createdProduct);
                    addedCategories.push(await childCategoryObj.save());
                }
                catch(err){
                    console.error(`Cannot save the product for category: ${categoryId}`)
                    // do nothing
                    continue;
                }
            }
            data["addedCategories"] = addedCategories;
        }
        return res.json(data);
    },
    // Update a product
    updateProduct: async (req, res) => {
        let reqBody = req.body;
        if (typeof reqBody == "string"){
            reqBody = JSON.parse(reqBody);
        }
        const response = {
            status: "OK",
            data: null
        }
        const {id, name, price, brand } = reqBody;
        if (!id){
            console.info("Id has to be given.")
            return res.json({
                status: "ERROR",
                data: "Id has to be given."
            });
        }
        try{
            createdProduct = await ProductSchema.findById(id);
            if (name){
                createdProduct.name = name
            }
            if (price){
                createdProduct.price = price
            }
            if (brand){
                createdProduct.brand = brand
            }
            const savedProduct = await createdProduct.save();
            response["data"] = savedProduct
        }
        catch(err){
            const err_msg = `Error updating the product, Error:${err}`
            console.error(err_msg);
            response["status"] = "ERROR";
            response["data"] = err_msg;
        }
        return res.json(response);    
    },
}