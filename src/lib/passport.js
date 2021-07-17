const passport = require("passport");
const LocalStrategy = require("passport-local");

const pool = require("../database");
const helpers = require("../lib/helpers");
const { use } = require("../routes/blocs");

passport.use("local.signin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) =>{

    console.log(req.body)

    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username])

    if (rows.length > 0){
        const user = rows[0]
        if(await helpers.matchPassword(password, user.password)){

            done(null, user, req.flash("success", "Bienvenido " + user.username))

        } else {

            done(null, false, req.flash("error", "Contraseña incorrecta"))

        }
    } else {

        return done(null, false, req.flash("error", "No existe el usuario"))

    }

}));

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { names, first_surname, second_surname } = req.body;

      const newUser = {
        username,
        password,
        names,
        first_surname,
        second_surname,
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE ID = ?", [id]);
  done(null, rows[0]);
});
