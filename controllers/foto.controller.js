const db = require("../models");
const Foto = db.fotos;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD




const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads') //guarda en carpeta uploads
  },
  filename: function(req, file, cb){
    cb(null, `${Date.now()}_${file.originalname}`) //nombre de archivo
  }
})
const upload = multer({storage: storage, fileFilter: imageFilter});
exports.upload = upload.single('imagen')




// Create and Save a new foto
exports.create = (req, res) => {
    console.log(req.file.path);
    const foto = {    
      imagenPath: req.file.path,
      descripcion: req.body.descripcion,
      idServicio: req.body.idServicio    //Agregue idServicio, SI O SI tiene que crearse la foto con un servicio asociado
    };
    // Save foto in the database
    Foto.create(foto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the foto."
        });
      });
  };

// Retrieve all fotos from the database.
exports.findAll = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Foto.findAll({include: ['servicio'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Fotos."
        });
      });
  };
// Find a single Foto with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Foto.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Foto with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Foto with id=" + id
        });
      });
  };
// Update a Foto by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Foto.update(req.body, {
      where: { idFoto: id }
    })
      .then(num => {
      
        if (num == 1) {
          res.send({
            message: "Foto was updated successfully."
            
          });
        } else {
          res.send({
            message: `Cannot update Foto with id=${id}. Maybe Foto was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Foto with id=" + id
        });
      });
  };
// Delete a Foto with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const imagenPath = req.query.imagenPath;
   
    if(imagenPath){
     fs.unlinkSync(path.resolve(imagenPath));
    }
  
    Foto.destroy({
      where: { idFoto: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Foto was deleted successfully!"      
          });
        } else {
          res.send({
            message: `Cannot delete Foto with id=${id}. Maybe Foto was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Foto with id=" + id
        });
      });
  };

  exports.findAllServicio = (req, res) => {
    //const nombre = req.query.nombre;
    //var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    const idServicio = req.query.idServicio;
    var condition;
    condition = idServicio ? { idServicio: { [Op.like]: `%${idServicio}%` } } : null //trae las fotos de un servicio seleccionado
  
    Cliente.findAll({ where: condition, include: ['servicio']  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clientes."
        });
      });
  };
  

// Find all published Fotos este es mas custom ya, falta modificar
exports.findAllPublished = (req, res) => {
    Foto.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Fotos."
        });
      });
  };

