module.exports = (sequelize, Sequelize) => {
    const Foto = sequelize.define("fotos", {
      idFoto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      imagenPath: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
    }, {
      timestamps: false
    }
  
    );
    return Foto;
  };