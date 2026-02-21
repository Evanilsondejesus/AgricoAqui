const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();

const authMiddleware = require("../middleware/authMiddleware");
const ProdutoComprado = require("../models/ProdutoComprado");


const router = express.Router();



router.post("/finalizar", authMiddleware, async (req, res) => {
  try {
    const { itens} = req.body;

    if (!itens || itens.length === 0) {
      return res.status(400).json({ erro: "Carrinho vazio" });
    }


    // 🔥 Salvar cada item
    for (const item of itens) {
      await ProdutoComprado.create({
        nome: item.nome,
        descricao: item.descricao,
        produto_id: item.id,
        usuario_id: req.userId, // vem do authMiddleware
        quantidade: item.quantidade,
        preco: item.preco,
        imagem: item.imagem
      });
    }

    res.json({ mensagem: "Compra salva com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao salvar compra" });
  }
});

router.get("/produto-comprado", authMiddleware, async (req, res) => {

const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }


  try {


    const produtos = await ProdutoComprado.findAll(
      {
        where: { usuario_id: req.userId }
      }
    );

  
    res.json(produtos);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});







module.exports = router;