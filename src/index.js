const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MYSQLStore = require("express-mysql-session");
const passport = require("passport");

const { database } = require("./keys");

//Iniciliaciones
const app = express();
require("./lib/passport")

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

//MiddleWares
app.use(
  session({
    secret: "mdc",
    resave: false,
    saveUninitialized: false,
    store: MYSQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.error = req.flash("error");
  app.locals.user = req.user
  next();
});

//Rutas
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/blocs", require("./routes/blocs"));

//Publico
app.use(express.static(path.join(__dirname, "public")));

//Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Server en el puerto", app.get("port"));
});
