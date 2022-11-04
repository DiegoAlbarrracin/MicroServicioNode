const db = require("../models");
const Servicio = db.servicios;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD

// Create and Save a new servicio
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nombre) {  //es para validar, como ejemplo
      res.status(400).send({
        message: "nombre can not be empty!"
      });
      return;
    }*/
    // Create a servicio
    const servicio = {    
      //published: req.body.published ? req.body.published : false //ternario Si la condición es true, el operador retorna el valor de la expr1; de lo contrario, devuelve el valor de expr2.
      nombre: req.body.nombre,
      duracion: req.body.duracion, 
      descripcion: req.body.descripcion,
      estado: '0',
    };
    // Save servicio in the database
    Servicio.create(servicio)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Servicio."
        });
      });
  };

// Retrieve all Servicios from the database y sus fotos
exports.findAll = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Servicio.findAll({ include: ["fotos"] }/*{ where: condition }*/)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Servicios."
        });
      });
  };
// //Obtener un servicio y todas las fotos asociadas
exports.findOne = (req, res) => {
    const id = req.params.id;
    Servicio.findByPk(id, { include: ["fotos"] })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Servicio with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Servicio with id=" + id
        });
      });
  };


// Update a Servicio by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Servicio.update(req.body, {
      where: { idServicio: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Servicio was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Servicio with id=${id}. Maybe Servicio was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Servicio with id=" + id
        });
      });
  };
// Delete a Servicio with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Servicio.destroy({
      where: { idServicio: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Servicio was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Servicio with id=${id}. Maybe Servicio was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Servicio with id=" + id
        });
      });
  };
  

// Find all published Servicios este es mas custom ya, falta modificar
exports.findAllPublished = (req, res) => {
    Servicio.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Servicios."
        });
      });
  };

  exports.findAllEstado = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    const estado = req.query.estado;
    var condition;
    if(estado == '0' || estado == '1'){
      condition = estado ? { estado: { [Op.like]: `${estado}` } } : null
  
    }else(
      condition = estado ? { [Op.or]: [{estado: 0}, {estado: 1}] } : null
    )
  
    Servicio.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving servicios."
        });
      });
  };