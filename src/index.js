const express = require("express");
const morgan = require("morgan");

//Iniciliaciones
const app = express();

//Configuraciones
app.set("port", process.env.PORT || 4000);

//MiddleWares
app.use(morgan("dev"));

//Variables Globales

//Rutas

//Publico

//Iniciar el servidor
app.listen(app.get("port"), () => {
    console.log("Server en el puerto", app.get("port"))
})