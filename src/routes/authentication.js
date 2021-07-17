const express = require("express");
const router = express.Router()

const passport = require("passport")
const {isLoggedIn, isLoggedInProhibited} =  require("../lib/auth")

router.get("/signup", isLoggedInProhibited, (req, res) =>{
    res.render("auth/signup")
})

router.post("/signup", isLoggedInProhibited, passport.authenticate("local.signup", {

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