const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Bonus middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
})

// Serve static HTML page
app.use(express.static(path.join(__dirname, "public")));

// GET /
app.get("/", (req, res) => {
    res.send("My Week 2 API!");
});

//POST /user
app.post("/user", (req, res) => {
    const {name, email} = req.body;

    // Error handling
    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        })
    }

    res.json({
        massage: `Hello, ${name}!`
    });
});

//GET /user/:id
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    res.send(`User ${userId} profile`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});