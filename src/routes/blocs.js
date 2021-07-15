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
  res.redirect("/blocs");
});

router.get("/", async (req, res) => {

  const blocs = await pool.query("SELECT * FROM bloc")
  console.log(blocs)
  res.render("blocs/list", {blocs})

});

module.exports = router;
