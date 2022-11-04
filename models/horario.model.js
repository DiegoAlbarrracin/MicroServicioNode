module.exports = (sequelize, Sequelize) => {
    const Horario = sequelize.define("horarios", {
      idHorario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      horaInicioJornada: {
        type: Sequelize.STRING
      },
      horaFinJornada: {
        type: Sequelize.STRING
      },
      horaInicioJornada2: {
        type: Sequelize.STRING
      },
      horaFinJornada2: {
        type: Sequelize.STRING
      },
      dia: {
        type: Sequelize.STRING
    },
    }, {
      timestamps: false
    }
  
    );
    return Horario;
  };