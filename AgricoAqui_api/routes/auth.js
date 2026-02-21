const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();
const router = express.Router();

// Configuração padrão de cookies
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  path: "/",
  maxAge: 3600000 // 1 hora
}






router.post("/cadastro", async (req, res) => {

    console.log("chegou !!")
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, cookieOptions);
    return res.status(201).json({ mensagem: "Usuário criado e logado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro no cadastro" });
  }
});

 
 
 router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, cookieOptions);

    return res.json({ 
      mensagem: "Login realizado com sucesso",
      usuario: { nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Não foi possível realizar essa operação" });
  }
});
 



router.post("/logout", (req, res) => {
  console.log("Logout - Token recebido:", req.cookies.token);

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  return res.status(200).json({ mensagem: "Logout realizado com sucesso" });
});

module.exports = router;
