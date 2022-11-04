const db = require("../models");
const Turno = db.turnos;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD

// Create and Save a new Turno
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nombre) {  //es para validar, como ejemplo
      res.status(400).send({
        message: "nombre can not be empty!"
      });
      return;
    }*/
    // Create a Turno
    const turno = {    
      //published: req.body.published ? req.body.published : false //ternario Si la condición es true, el operador retorna el valor de la expr1; de lo contrario, devuelve el valor de expr2.
      fecha: req.body.fecha,
      hora: req.body.hora,
      descripcion: req.body.descripcion ? req.body.descripcion : null,
      idServicio: req.body.idServicio,
      idPeluquero: req.body.idPeluquero,
      idCliente: req.body.idCliente,
      estado: '0',      
    };
    // Save Turno in the database
    Turno.create(turno)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Turno."
        });
      });
  };

// Retrieve all Turnos from the database.
exports.findAll = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Turno.findAll(/*{ where: condition }*/)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving turnos."
        });
      });
  };

// Find a single Turno with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Turno.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Turno with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Turno with id=" + id
        });
      });
  };

// Update a Turno by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Turno.update(req.body, {
      where: { idTurno: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Turno was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Turno with id=${id}. Maybe Turno was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Turno with id=" + id
        });
      });
  };

// Delete a Turno with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Turno.destroy({
      where: { idTurno: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Turno was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Turno with id=${id}. Maybe Turno was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Turno with id=" + id
        });
      });
  };  


exports.findAllEstado = (req, res) => {
  //const nombre = req.query.nombre;
  //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  const estado = req.query.estado;
  var condition;
  if(estado == '0' || estado == '1' || estado == '2'){ //Pendiente 0, Aceptado 1, Rechazado 2
    condition = estado ? { estado: { [Op.like]: `%${estado}%` } } : null

  }else(
    condition = estado ? { [Op.or]: [{estado: 0}, {estado: 1}, , {estado: 2}] } : null
  )

  Turno.findAll({ where: condition, include: ['peluquero','servicio','cliente'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving turnos."
      });
    });
};

exports.findAllTurnosDados = (req, res) => {
  //const nombre = req.query.nombre;
  //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  
  const idPeluquero = req.query.idPeluquero;
  const fecha = req.query.fecha;

  var condition1;
  var condition2;
  var condition3;
   //Pendiente 0, Aceptado 1, Rechazado 2
    condition1 = { idPeluquero : { [Op.eq]: `${idPeluquero}` } } 
    condition2 = { fecha : { [Op.gte]: `${fecha}` } } 
    condition3 = { estado : { [Op.ne]: `${2}` } } 

  Turno.findAll({ where: {
    [Op.and]: [
      condition1,
      condition2,
      condition3
    ]
  }
    , include: ['peluquero','servicio','cliente'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving turnos."
      });
    });
};

exports.findAllTurnosOneCliente = (req, res) => {
  //const nombre = req.query.nombre;
  //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  
  const idCliente = req.query.idCliente;
  const estado = req.query.estado;

  condition1 = { idCliente : { [Op.eq]: `${idCliente}` } } 
  var condition2;
   //Pendiente 0, Aceptado 1, Rechazado 2, todos 4

  if(estado == '0' || estado == '1' || estado == '2'){ //Pendiente 0, Aceptado 1, Rechazado 2
    condition2 = estado ? { estado: { [Op.like]: `${estado}` } } : null

  }else(
    condition2 = estado ? { [Op.or]: [{estado: 0}, {estado: 1}, , {estado: 2}] } : null
  )

  Turno.findAll({ where: {
    [Op.and]: [
      condition1,
      condition2
    ]
  }
    , include: ['peluquero','servicio','cliente'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving turnos."
      });
    });
};