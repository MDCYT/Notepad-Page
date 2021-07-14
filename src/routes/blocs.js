const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("blocs/add");
});

router.post("/add", async (req, res) => {
  const { title, text, description } = req.body;
  const newbloc = {
      title,
      text,
      description
  };
  await pool.query("INSERT INTO bloc set ?", [newbloc])
  res.send("recibido");
});

module.exports = router;
