const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.servicios = require("./servicio.model.js")(sequelize, Sequelize);
db.fotos = require("./foto.model.js")(sequelize, Sequelize);
db.peluqueros = require("./peluquero.model.js")(sequelize, Sequelize);
db.horarios = require("./horario.model.js")(sequelize, Sequelize);
db.turnos = require("./turno.model.js")(sequelize, Sequelize);




//Relaciones entre tablas:
/*db.servicios.hasMany(db.fotos, { as: "fotos" });
db.foto.belongsTo(db.servicios, {
  foreignKey: "idServicio",
  as: "servicio",
});*/

//Servicio-Foto
db.servicios.hasMany(db.fotos, {
    foreignKey: 'idServicio',
    sourceKey: 'idServicio'
});
db.fotos.belongsTo(db.servicios, {
  foreignKey: "idServicio",
  targetId: "idServicio"
});

//Peluquero-Horario:
db.peluqueros.hasMany(db.horarios, {
  foreignKey: 'idPeluquero',
  sourceKey: 'idPeluquero'
});
db.horarios.belongsTo(db.peluqueros, {
foreignKey: "idPeluquero",
targetId: "idPeluquero"
});

//Peluquero-Turno:
db.peluqueros.hasMany(db.turnos, {
  foreignKey: 'idPeluquero',
  sourceKey: 'idPeluquero'
});
db.turnos.belongsTo(db.peluqueros, {
foreignKey: "idPeluquero",
targetId: "idPeluquero"
});

//Cliente-Turno:
db.clientes.hasMany(db.turnos, {
  foreignKey: 'idCliente',
  sourceKey: 'idCliente'
});
db.turnos.belongsTo(db.clientes, {
foreignKey: "idCliente",
targetId: "idCliente"
});

//Servicio-Turno:
db.servicios.hasMany(db.turnos, {
  foreignKey: 'idServicio',
  sourceKey: 'idServicio'
});
db.turnos.belongsTo(db.servicios, {
foreignKey: "idServicio",
targetId: "idServicio"
});
//Relaciones entre tablas

module.exports = db;