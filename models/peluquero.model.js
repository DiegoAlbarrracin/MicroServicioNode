module.exports = (sequelize, Sequelize) => {
    const Peluquero = sequelize.define("peluqueros", {
      idPeluquero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.INTEGER
      },
      duracionMinimaTurno: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: '0'
    },
    }, {
      timestamps: false
    }
  
    );
    return Peluquero;
  };