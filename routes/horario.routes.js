module.exports = app => {
    const horarios = require("../controllers/horario.controller.js");
    var router = require("express").Router();

    // Create a new horario
    router.post("/", horarios.create);
    // Retrieve all horarios
    router.get("/", horarios.findAll);    
    // Retrieve all horarios por Estado (table horarios) ESTAS QUE POSEEN UN /... DE MAS, VAN ANTES ESCRITAS, SINO ENTRA EN /:id y toma a /estado como parametro de ID
    //router.get("/estado", horarios.findAllEstado);
    // Retrieve a single horario with id
    router.get("/:id", horarios.findOne);

    // Retrieve horarios of peluquero
    router.get("/peluquero/propio/:id", horarios.findAllofPeluquero);
    // Update a horario with id
    router.put("/:id", horarios.update);
    // Delete a horario with id
    router.delete("/:id", horarios.delete);







    app.use('/api/horarios', router);
}; 