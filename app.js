const express = require("express"); // Include Express framework
const productRoutes = require("./routes/productRoutes"); // Import product routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to read JSON requests
app.use(express.json());

// Product routes
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Product Inventory App"
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});