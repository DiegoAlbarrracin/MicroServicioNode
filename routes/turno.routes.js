module.exports = app => {
    const turnos = require("../controllers/turno.controller.js");
    var router = require("express").Router();

    // Create a new turno
    router.post("/", turnos.create);
    // Retrieve all turnos
    router.get("/", turnos.findAll);    
    //retrieve all turnos of x cliente
    router.get("/turnosofOneCliente", turnos.findAllTurnosOneCliente)
    //retrieve all turnos desde x fecha en adelante de x peluquero
    router.get("/turnosDesde", turnos.findAllTurnosDados)
    // Retrieve all turnos por Estado (table turnos) ESTAS QUE POSEEN UN /... DE MAS, VAN ANTES ESCRITAS, SINO ENTRA EN /:id y toma a /estado como parametro de ID
    router.get("/estado", turnos.findAllEstado);
    // Retrieve a single turno with id
    router.get("/:id", turnos.findOne);
    // Update a turno with id
    router.put("/:id", turnos.update);
    // Delete a turno with id
    router.delete("/:id", turnos.delete);







    app.use('/api/turnos', router);
  }; 