module.exports = app => {
    const servicios = require("../controllers/servicio.controller.js");
    var router = require("express").Router();

    // Create a new servicio
    router.post("/", servicios.create);
    // Retrieve all servicios
    router.get("/", servicios.findAll); 
    // Retrieve all servicios por Estado (table servicios) ESTAS QUE POSEEN UN /... DE MAS, VAN ANTES ESCRITAS, SINO ENTRA EN /:id y toma a /estado como parametro de ID
    router.get("/estado", servicios.findAllEstado);   
    // Retrieve a single servicio with id
    router.get("/:id", servicios.findOne);
    // Update a servicio with id
    router.put("/:id", servicios.update);
    // Delete a servicio with id
    router.delete("/:id", servicios.delete);




    // Retrieve all published servicios FALTA CONFIGURAR, ES CUSTOM
    router.get("/published", servicios.findAllPublished);




    app.use('/api/servicios', router);
  };