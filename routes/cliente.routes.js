module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    var router = require("express").Router();

    // Create a new Cliente
    router.post("/" , clientes.create);
    // Retrieve all clientes MICROSERVICIOS
    router.get("/",clientes.findAll);    
    
    // Retrieve all clientes por Estado (table clientes) ESTAS QUE POSEEN UN /... DE MAS, VAN ANTES ESCRITAS, SINO ENTRA EN /:id y toma a /estado como parametro de ID
    router.get("/estado", clientes.findAllEstado);
    // Retrieve a single cliente with id
    router.get("/msNode/:id", clientes.findOne);
    // Update a cliente with id
    router.put("/:id", clientes.update);
    // Delete a cliente with id
    router.delete("/:id", clientes.delete);







    app.use('/api/clientes', router);
  }; 