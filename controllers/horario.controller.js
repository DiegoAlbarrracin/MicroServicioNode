const db = require("../models");
const Horario = db.horarios;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD

// Create and Save a new horario
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nombre) {  //es para validar, como ejemplo
      res.status(400).send({
        message: "nombre can not be empty!"
      });
      return;
    }*/
    // Create a horario
    const horario = {    
      //published: req.body.published ? req.body.published : false //ternario Si la condición es true, el operador retorna el valor de la expr1; de lo contrario, devuelve el valor de expr2.
      horaInicioJornada: req.body.horaInicioJornada,
      horaFinJornada: req.body.horaFinJornada,
      idPeluquero: req.body.idPeluquero,    //Agregue idServicio, SI O SI tiene que crearse la horario con un servicio asociado
      dia: req.body.dia,
      horaInicioJornada2: req.body.horaInicioJornada2,
      horaFinJornada2: req.body.horaFinJornada2
    };
    // Save horario in the database
    Horario.create(horario)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the horario."
        });
      });
  };

// Retrieve all horarios from the database.
exports.findAll = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Horario.findAll({
      include: 'peluquero'
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Horarios."
        });
      });
  };

 //Devuelve todos los horarios de un peluquero
 exports.findAllofPeluquero = (req, res) => {
  //const nombre = req.query.nombre;
  //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  const id = req.params.id;
  
  Horario.findAll({ where: { idPeluquero : id} ,
    include: 'peluquero'
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Horarios."
      });
    });
};

// Find a single Horario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Horario.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Horario with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Horario with id=" + id
        });
      });
  };
// Update a Horario by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Horario.update(req.body, {
      where: { idHorario: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Horario was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Horario with id=${id}. Maybe Horario was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Horario with id=" + id
        });
      });
  };
// Delete a Horario with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Horario.destroy({
      where: { idHorario: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Horario was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Horario with id=${id}. Maybe Horario was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Horario with id=" + id
        });
      });
  };
  
