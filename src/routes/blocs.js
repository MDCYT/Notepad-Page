const express = require("express");
const router = express.Router();

const pool = require("../database");
const {isLoggedIn, isLoggedInProhibited} =  require("../lib/auth")

router.get("/add", isLoggedIn, (req, res) => {
  res.render("blocs/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { title, text, description } = req.body;
  const newbloc = {
      title,
      text,
      description,
      user_id: req.user.id
  };
  await pool.query("INSERT INTO bloc set ?", [newbloc])
  req.flash("success", "Nota guardada exitosamente");
  res.redirect("/blocs");
});

router.get("/", isLoggedIn, async (req, res) => {

  const blocs = await pool.query("SELECT * FROM bloc WHERE user_id = ?", [req.user.id])
  res.render("blocs/list", {blocs})

});

router.get("/delete/:id", isLoggedIn, async (req, res) => {

  const { id } = req.params
  const dates = JSON.parse(JSON.stringify(await pool.query("SELECT * FROM bloc WHERE ID = ?", [id])))

  if (req.user.id == dates[0].user_id) {
    await pool.query("DELETE FROM bloc WHERE ID = ?", [id])
    req.flash("success", "Nota eliminada exitosamente");
    res.redirect("/blocs")
  } else {
    req.flash("error", "Se ha intentado borrar una nota que que no es tuya");
    res.redirect("/blocs")
  }



});

router.get("/edit/:id", isLoggedIn, async (req, res) => {

  const { id } = req.params
  const bloc = await pool.query("SELECT * FROM bloc WHERE ID = ?", [id])

  const dates = JSON.parse(JSON.stringify(await pool.query("SELECT * FROM bloc WHERE ID = ?", [id])))

  if (req.user.id == dates[0].user_id) {
    res.render("blocs/edit", {bloc: bloc[0]})
  } else {
    req.flash("error", "Se ha intentado editar una nota que que no es tuya");
    res.redirect("/blocs")
  }

  // await pool.query("DELETE FROM bloc WHERE ID = ?", [id])
  // res.redirect("/blocs")

});

router.post("/edit/:id", isLoggedIn, async (req, res) => {

  const { id } = req.params
  const { title, description, text } = req.body
  const editBloc = {
    title,
    description,
    text
  }

  await pool.query("UPDATE bloc set ? WHERE ID = ?", [editBloc, id])

  const dates = JSON.parse(JSON.stringify(await pool.query("SELECT * FROM bloc WHERE ID = ?", [id])))

  if (req.user.id == dates[0].user_id) {
    req.flash("success", "Nota editada exitosamente");
    res.redirect("/blocs")
  } else {
    req.flash("error", "Se ha intentado editar una nota que que no es tuya");
    res.redirect("/blocs")
  }



});

module.exports = router;
