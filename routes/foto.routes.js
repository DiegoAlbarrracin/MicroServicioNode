module.exports = app => {
    const fotos = require("../controllers/foto.controller.js");
    var router = require("express").Router();

    // Create a new foto
    router.post("/",fotos.upload ,fotos.create); //"/", fotos.create
    // Retrieve all fotos
    router.get("/", fotos.findAll);   
    // Retrieve all fotos por Servicio 
    router.get("/servicio", fotos.findAllServicio); 
    // Retrieve a single foto with id
    router.get("/:id", fotos.findOne);
    // Update a foto with id
    router.put("/:id", fotos.update);
    // Delete a foto with id
    router.delete("/:id", fotos.delete);




    // Retrieve all published fotos FALTA CONFIGURAR, ES CUSTOM
    router.get("/published", fotos.findAllPublished);




    app.use('/api/fotos', router);
  };

