const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/blocs/favorites", (req, res) => {
    res.send("No hay :sad:")
})

module.exports = router