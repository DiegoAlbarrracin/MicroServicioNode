const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op; //Op contiene los operadores que brinda sequelize para hacer querys de CRUD

//Para webhook
const axios = require('axios');
const peticiones = [];

// Create and Save a new Cliente
exports.create = (req, res) => {

  // crea un nuevo objeto `Date`
  const today = new Date();
  // obtener la fecha y la hora
  const now = today.toLocaleString();  
  // Armo el valor completo de la peticion
  const peticion = now + 'hs '+ req.method + ' en /api/clientes.';
  //console.log('Peticion ind: '+peticion);
  // Pusheo peticion al array
  peticiones.push(peticion);
  //console.log('Peticiones array: '+ peticiones);
  webhook();

 
    // Create a Cliente
    const cliente = {    
      //published: req.body.published ? req.body.published : false //ternario Si la condición es true, el operador retorna el valor de la expr1; de lo contrario, devuelve el valor de expr2.
      
      nombre: req.body.nombre,
      apellido: req.body.apellido ? req.body.apellido : "", //VER ANOTACIONES
      dni: req.body.dni,
      telefono: req.body.telefono,
      email: req.body.email,
      password: req.body.password,
      estado: '0',
    };
    // Save Cliente in the database
    Cliente.create(cliente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cliente."
        });
      });
  };




// Retrieve all Clientes from the database.
exports.findAll = (req, res) => {
   
    


    Cliente.findAll(/*{ where: condition }*/)
      .then(async data => {
        await data.push(procesadoNode);
        //clientesData.push(data);
        console.log(data[0].dataValues);
        console.log(data[1].dataValues);
        console.log(data[2]);


        res.send(data);

        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clientes."
        });
      });

      //console.log(usuariosData);

    //llamarMicrosGo();
  };













// Find a single Cliente with an id
  var idCliente;
  var nombre;
  var dni;
  var telefono;
  var email;
  var procesadoPor;

exports.findOne = (req, res) => {

  // crea un nuevo objeto `Date`
  const today = new Date();
  // obtener la fecha y la hora
  const now = today.toLocaleString();  
  // "Etiqueta" para saber que fue procesado
  procesadoPor = 'procesado por Nodejs ' + now + 'hs' + ' en /api/clientes/msNode'

  const id = req.params.id;

    Cliente.findByPk(id)
      .then(data => {
        if (data) {
           idCliente = data.idCliente;
           nombre = data.nombre + ' ' + data.apellido;
           dni = data.dni;
           telefono = data.telefono;
           email = data.email;
           procesadoPor = procesadoPor;

           //Metodo para llamar al microservicio en Go
           llamarMicrosGo();


           //console.log(idCliente + nombre + dni + telefono + email + procesadoPor);

          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Cliente with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Cliente with id=" + id
        });
      });
  };

  async function llamarMicrosGo() {
    console.log(idCliente + nombre + dni + telefono + email + procesadoPor);

    //Envio la data a Go mediante un post, me responde y almaceno la data procesada en respGo
    axios.post('http://localhost:7000/microserviciosGo', {
          idCliente: idCliente,
          nombre: nombre,
          dni: dni,
          telefono: telefono,
          email: email,
          procesadoPor: procesadoPor,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    //Envio la data a Python, que luego procesara y enviara un mail a mi correo para comprobar que se han comunicado los microservicios.
    axios.post('http://localhost:3700python', {
          peticion1: String(peticiones[0]),
          peticion2: String(peticiones[1]),
          peticion3: String(peticiones[2]),
          peticion4: String(peticiones[3]),
          peticion5: String(peticiones[4]),
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

  }

    //console.log(usuariosData);
    //Envio la data a Go mediante un post, me responde y almaceno la data procesada en respGo
    /*const respGo = await axios.post('http://localhost:3700/webhook', clientesData).then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });;

    //Envio la data a Python, que luego procesara y enviara un mail a mi correo para comprobar que se han comunicado los microservicios.
    axios.post('http://localhost:3700/webhook', {
          peticion1: String(peticiones[0]),
          peticion2: String(peticiones[1]),
          peticion3: String(peticiones[2]),
          peticion4: String(peticiones[3]),
          peticion5: String(peticiones[4]),
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });*/





























// Update a Cliente by the id in the request
exports.update = (req, res) => {

   // crea un nuevo objeto `Date`
   const today = new Date();
   // obtener la fecha y la hora
   const now = today.toLocaleString();  
   // Armo el valor completo de la peticion
   const peticion = now + 'hs '+ req.method +' en /api/clientes/' + req.params.id;
   //console.log('Peticion ind: '+peticion);
   // Pusheo peticion al array
   peticiones.push(peticion);
   //console.log('Peticiones array: '+ peticiones);
   webhook();



    const id = req.params.id;
    Cliente.update(req.body, {
      where: { idCliente: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cliente was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Cliente with id=${id}. Maybe Cliente was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cliente with id=" + id
        });
      });
  };

// Delete a Cliente with the specified id in the request
exports.delete = (req, res) => {

   // crea un nuevo objeto `Date`
   const today = new Date();
   // obtener la fecha y la hora
   const now = today.toLocaleString();  
   // Armo el valor completo de la peticion
   const peticion = now + 'hs '+ req.method +' en /api/clientes/' + req.params.id;
   //console.log('Peticion ind: '+peticion);
   // Pusheo peticion al array
   peticiones.push(peticion);
   //console.log('Peticiones array: '+ peticiones);
   webhook();



    console.log(req.method + ' ' + 'aaaaaa' );
    const id = req.params.id;
    Cliente.destroy({
      where: { idCliente: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cliente was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Cliente with id=${id}. Maybe Cliente was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cliente with id=" + id
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

  Cliente.findAll({ where: condition })
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






const tokenLocal = 'tokenWebhook123' ;
const webhook = async() => {  

  if(peticiones.length == 5){

    const tokenWB = await axios.get('http://localhost:3700/webhook');

    if(tokenWB.data.token == tokenLocal){

      axios.post('http://localhost:3700/webhook', {
        peticion1: String(peticiones[0]),
        peticion2: String(peticiones[1]),
        peticion3: String(peticiones[2]),
        peticion4: String(peticiones[3]),
        peticion5: String(peticiones[4]),
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
        
    }else{
      console.log('Token incorrecto. Sin acceso');
    }

    peticiones.length = 0;
  }
};