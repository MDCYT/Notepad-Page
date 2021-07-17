const express = require("express");
const router = express.Router()

const pool = require("../database");
const passport = require("passport")
const {isLoggedIn, isLoggedInProhibited} =  require("../lib/auth")

router.get("/signup", isLoggedInProhibited, async (req, res) =>{

    res.render("auth/signup")

    // console.log(req.body)

    // const dates = JSON.parse(JSON.stringify(await pool.query("SELECT * FROM users WHERE username = ?", ["1"])))

    // console.log(dates)
    // // if (req.user.id == dates[0].user_id) {
    // //   req.flash("success", "Nota editada exitosamente");
    // //   res.redirect("/blocs");
    // // } else {
    // //   res.render("auth/signup");
    // // }
  
})

router.post("/signup", isLoggedInProhibited, async (req, res, next) => {

    const { username } = req.body;
    const dates = JSON.parse(JSON.stringify(await pool.query("SELECT * FROM users WHERE username = ?", [username])))
    if (dates[0]) {
      req.flash("error", "El nombre de usuario ya existe");
      res.redirect("/signup");
    } else {
        return next();
    }
  }, passport.authenticate("local.signup", {

    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true

    }))

router.get("/signin", isLoggedInProhibited, (req, res) => {

    res.render("auth/signin")

})  

router.post("/signin", isLoggedInProhibited, (req, res, next) => {

    passport.authenticate("local.signin", {

        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true

    })(req, res, next)

})

router.get("/profile", isLoggedIn, (req, res) =>{
    res.render("profile")
})

router.get("/logout", isLoggedIn, (req, res) =>{
    req.logout();
    res.redirect("/signin");
})

module.exports = router