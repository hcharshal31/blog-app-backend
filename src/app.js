const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes.js")
const postRoutes = require("./routes/postRoutes.js")
const commentRoutes = require("./routes/commentRoutes.js")

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Comments routes
app.use("/", commentRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Blog API is running..." })
})

module.exports = app;