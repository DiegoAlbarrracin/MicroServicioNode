module.exports = app => {
    const peluqueros = require("../controllers/peluquero.controller.js");
    var router = require("express").Router();

    // Create a new peluquero
    router.post("/", peluqueros.create);
    // Retrieve all peluqueros
    router.get("/", peluqueros.findAll);    
    // Retrieve all peluqueros por Estado (table peluqueros) ESTAS QUE POSEEN UN /... DE MAS, VAN ANTES ESCRITAS, SINO ENTRA EN /:id y toma a /estado como parametro de ID
    router.get("/estado", peluqueros.findAllEstado);
    // Retrieve a single peluquero with id
    router.get("/:id", peluqueros.findOne);
    // Update a peluquero with id
    router.put("/:id", peluqueros.update);
    // Delete a peluquero with id
    router.delete("/:id", peluqueros.delete);







    app.use('/api/peluqueros', router);
  }; 