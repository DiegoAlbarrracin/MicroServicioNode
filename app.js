const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const db = require("./models"); //CUIDADO



var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



//CUIDADO
db.sequelize.sync()//Aca podria ir lo de .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
//CUIDADO



// De aca para abajo van todas las rutas de Routes
require("./routes/cliente.routes")(app);
require("./routes/servicio.routes")(app);
require("./routes/foto.routes")(app);
require("./routes/peluquero.routes")(app);
require("./routes/horario.routes")(app);
require("./routes/turno.routes")(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Funciona" });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port  http://localhost:${PORT}/`);
});


//Especificando la carpeta uploads como publica para accederla desde el navegador
app.use('/uploads', express.static(path.resolve('uploads')));