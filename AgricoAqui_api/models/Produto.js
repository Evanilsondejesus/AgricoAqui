const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");


const Produto = sequelize.define("Produto", {
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  unidade: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "kg"
  },
  imagem: {                    // 👈 NOVO CAMPO
    type: DataTypes.STRING(255),
    allowNull: true
  },

  
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "produtos",
  timestamps: true,
  createdAt: "criado_em",
  updatedAt: false
});

module.exports = Produto;
