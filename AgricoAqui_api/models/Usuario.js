const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Usuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  }



  
}, {
  tableName: "usuarios",
  timestamps: true,
  createdAt: "criado_em",
  updatedAt: false
});

module.exports = Usuario;
