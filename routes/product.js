const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");
const router = require("express").Router();

// Create Product
router.post("/", async (req, res) => {
    console.log("Creating new product:", req.body);
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
});

// Update Product
router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
});

// Delete Product
router.delete("/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
});

// Get Product by ID
router.get("/find/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to get product", error: error.message });
    }
});

// Get All Products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                categories: { $in: [qCategory] }
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to get products", error: error.message });
    }
});

module.exports = router;