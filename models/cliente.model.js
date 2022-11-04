module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("clientes", {
    idCliente: {
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
    dni: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
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
  return Cliente;
};