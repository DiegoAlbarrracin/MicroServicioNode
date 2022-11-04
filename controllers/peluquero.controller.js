const db = require("../models");
const Peluquero = db.peluqueros;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD

// Create and Save a new peluquero
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nombre) {  //es para validar, como ejemplo
      res.status(400).send({
        message: "nombre can not be empty!"
      });
      return;
    }*/
    // Create a peluquero
    const peluquero = {    
      //published: req.body.published ? req.body.published : false //ternario Si la condición es true, el operador retorna el valor de la expr1; de lo contrario, devuelve el valor de expr2.
      
      nombre: req.body.nombre,
      apellido: req.body.apellido ? req.body.apellido : "", //VER ANOTACIONES
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      duracionMinimaTurno: req.body.duracionMinimaTurno,
      estado: '0',
    };
    // Save peluquero in the database
    Peluquero.create(peluquero)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the peluquero."
        });
      });
  };

// Retrieve all peluqueros from the database.
exports.findAll = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Peluquero.findAll(/*{ where: condition }*/)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Peluqueros."
        });
      });
  };

// Find a single Peluquero with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Peluquero.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Peluquero with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Peluquero with id=" + id
        });
      });
  };

// Update a Peluquero by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Peluquero.update(req.body, {
      where: { idPeluquero: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Peluquero was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Peluquero with id=${id}. Maybe Peluquero was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Peluquero with id=" + id
        });
      });
  };

// Delete a Peluquero with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Peluquero.destroy({
      where: { idPeluquero: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Peluquero was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Peluquero with id=${id}. Maybe Peluquero was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Peluquero with id=" + id
        });
      });
  };  


exports.findAllEstado = (req, res) => {
  //const nombre = req.query.nombre;
  //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  const estado = req.query.estado;
  var condition;
  if(estado == '0' || estado == '1'){
    condition = estado ? { estado: { [Op.like]: `%${estado}%` } } : null

  }else(
    condition = estado ? { [Op.or]: [{estado: 0}, {estado: 1}] } : null
  )

  Peluquero.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Peluqueros."
      });
    });
};