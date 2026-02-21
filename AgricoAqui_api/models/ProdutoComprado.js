const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProdutoComprado = sequelize.define("ProdutoComprado", {
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: "produto_comprado",
  timestamps: true,
  createdAt: "criado_em",
  updatedAt: false,










hooks: {
  beforeValidate: (produto) => {
    if (produto.preco && produto.quantidade) {
      produto.total = produto.preco * produto.quantidade;
    }
  }
}


});

module.exports = ProdutoComprado;
