module.exports = (sequelize, Sequelize) => {
    const Turno = sequelize.define("turnos", {
      idTurno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      descripcion: {
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
    return Turno;
  };