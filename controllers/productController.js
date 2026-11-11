const products = require("../data/products");
//used to access the product from the data 
function vp(body) {
    if (!body || Object.keys(body).length === 0) {
        return "requst body is empty";
        //if the request body is empty 
    }

    const {
        name, price, quantity, category
    } = body;
    //it is uesd to check the data before to change or add new product

    if (!name || typeof name !== "string" || name.trim() === "") {
        return "Product name has an error";
         
        //used to check it has name if it has the name must be string and the name can not be empity


    }

    if (typeof price !== "number" || price <= 0) {
         
        return "Product  price has an error";
         
        //if the price must be number and the price must not be negative


    }

    if (typeof quantity !== "number" || quantity <= 0) {
    
        return "Product quantity has an error";
         
        //the quantity of the product is numeber and can not be negative 
    }

    if (!category || typeof category !== "string" || category.trim() === "") {

        return "category has an error";
        
        //it says the product must be has category and the category must be string and it not emepity


    }

    return null;
    //if all are true
}

module.exports = {//to check the error for GET
    getAllProducts: (req, res) => {
        res.status(200).json({
            success: true,
            data: products
        });
        //to get all product 200 says it is ok
    },
//to find product by id
    getProductById: (req, res) => {
        const id = parseInt(req.params.id);

    const product = products.find((p) => p.id === id);

        //search product by id
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product is not found"
            });
            //it tells the error by the json method 
        }

        res.status(200).json({
            success: true,
            data: product
        });
        //if the product is exist 
    },

    //to check the error for POST
    createProduct: (req, res) => {
        //to check the incomeing request 
        const error = vp(req.body);
        if (error) {
            //the validation has an error
            return res.status(400).json({
                success: false,
                message: error
            });
        }

        const newId = products.length > 0
            ? Math.max(...products.map((product) => product.id)) + 1
            : 1;
        //uesd to generat id and increase by one 

        const newProduct = {
            id: newId,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    },

    //to ckeck the erro of PUT
    updateProduct: (req, res) => {
        //form the router find the parameter id
        const { id } = req.params;//find the product to change by id


        const product = products.find((p)=>p.id===Number(id));
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product is not found"
            });
        }//to check the update product

        const error = vp(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed"
            });
        }

        product.name = req.body.name;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.category = req.body.category;

        res.status(200).json(product);
    },

   
patchProduct: (req, res) => {

    const { id } = req.params;

    const product = products.find(
        (p) => p.id === Number(id)
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product is not found"
        });
    }

    const { name, price, quantity, category } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty"
        });
    }

    if (name !== undefined &&
        (typeof name !== "string" || name.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "Invalid product name"
        });
    }

    if (price !== undefined &&
        (typeof price !== "number" || price <= 0)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product price"
        });
    }

    if (quantity !== undefined &&
        (typeof quantity !== "number" || quantity <= 0)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product quantity"
        });
    }

    if (category !== undefined &&
        (typeof category !== "string" || category.trim() === "")) {
        return res.status(400).json({
            success: false,
            message: "Invalid product category"
        });
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (category !== undefined) product.category = category;

    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
    });
},

    //to check DELETE
    deleteProduct: (req, res) => {
        const { id } = req.params;
        //find the product by useimg the index
        const productIndex = products.findIndex(
            (product) => product.id === Number(id)
        );

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product is not found"
            });
        }

        products.splice(productIndex, 1);
        //delete one product by giting the index

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    },

    //check GET for search product
    searchProducts: (req, res) => {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide the name to search"
            });
        }

        const searchTerm = name.toLowerCase();

        const results = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );

        res.status(200).json(results);
    },
//to get quantity is less than 5
    getLowStockProducts: (req, res) => {
        const results = products.filter((product) => product.quantity < 5);

        res.status(200).json(results);
    },
//to search all total value of the product
    getInventoryValue: (req, res) => {
        const totalInventoryValue = products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );

        res.status(200).json({ totalInventoryValue });
    },
//te get product by category
getProductByCategory: (req, res) => {
    const { category } = req.params;

    const results = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    res.status(200).json(results);
},
//to ge product by price
getProductByPrice: (req, res) => {
    const { price } = req.params;

    const results = products.filter(
        (product) => product.price === Number(price)
    );

    res.status(200).json(results);
}
};