const express = require("express");
const Produto = require("../models/Produto");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = require("../config/uploadConfig");

// 🔹 LISTAR TODOS OS PRODUTOS DO USUÁRIO LOGADO



// router.get("/listar", authMiddleware, async (req, res) => {
//   try {
//     const produtos = await Produto.findAll({
//       where: { usuario_id: req.userId }
//     });

//     res.json(produtos);
//   } catch (error) {
//     res.status(500).json({ erro: "Erro ao listar produtos" });
//   }
// });










// router.get("/listar", authMiddleware, async (req, res) => {

// const token = req.cookies.token;


//   if (!token) {
//     return res.status(401).json({ erro: "Token não fornecido" });
//   }


//   try {
//     const produtos = await Produto.findAll();

//     const baseUrl = `${req.protocol}://${req.get("host")}`;

//     const produtosFormatados = produtos.map(produto => {
//       const p = produto.toJSON();

//       return {
//         ...p,
//         imagem: p.imagem
//           ? `${baseUrl}/${p.imagem.replace(/\\/g, "/")}`
//           : null
//       };
//     });

//     res.json(produtosFormatados);

//   } catch (error) {
//     res.status(500).json({ erro: "Erro ao listar produtos" });
//   }
// });












/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

router.get("/listar", authMiddleware, async (req, res) => {
  try {
    const produtos = await Produto.findAll();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const produtosFormatados = produtos.map(produto => {
      const p = produto.toJSON();

      return {
        ...p,
        imagem: p.imagem ? `${baseUrl}/${p.imagem.replace(/\\/g, "/")}` : null,
        meuProduto: p.usuario_id === req.userId // ✅ propriedade extra
      };
    });

    res.json(produtosFormatados);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});




















// // 🔹 LISTAR TODOS OS PRODUTOS DO USUÁRIO LOGADO
// router.get("/listar", authMiddleware, async (req, res) => {
//   try {
//     const produtos = await Produto.findAll({
//       where: { usuario_id: req.userId }
//     });

//     res.json(produtos);
//   } catch (error) {
//     res.status(500).json({ erro: "Erro ao listar produtos" });
//   }
// });








router.get("/produto_user", authMiddleware, async (req, res) => {

const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }


  try {


    const produtos = await Produto.findAll(
      {
        where: { usuario_id: req.userId }
      }
    );

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const produtosFormatados = produtos.map(produto => {
      const p = produto.toJSON();

      return {
        ...p,
        imagem: p.imagem
          ? `${baseUrl}/${p.imagem.replace(/\\/g, "/")}`
          : null
      };
    });

    res.json(produtosFormatados);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});






















// 🔹 BUSCAR PRODUTO POR ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findOne({
      where: {
        id,
        usuario_id: req.userId
      }
    });

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});




router.post("/cria", authMiddleware, upload.single("imagem"), async (req, res) => {


  try {
    const { nome, descricao, preco, estoque, unidade } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const imagem = req.file ? req.file.path : null;



    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      estoque: estoque || 0,
      unidade: unidade || "kg",
      usuario_id: req.userId,
      imagem: imagem
    });

    res.status(201).json(produto);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
});






router.put("/:id", authMiddleware, upload.single("imagem"), async (req, res) => {


  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, unidade } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const imagem = req.file ? req.file.path : null;


    const produto = await Produto.update({
      nome,
      descricao,
      preco,
      estoque: estoque || 0,
      unidade: unidade || "kg",
      usuario_id: req.userId,
      imagem: imagem
    }, {
      where: { id }
    });

    res.status(201).json(produto);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});














// 🔹 ATUALIZAR PRODUTO
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nome, descricao, preco, estoque, unidade } = req.body;

//     const produto = await Produto.findOne({
//       where: {
//         id,
//         usuario_id: req.userId
//       }
//     });
//  const imagem = req.file ? req.file.path : null;


//     if (!produto) {
//       return res.status(404).json({ erro: "Produto não encontrado" });
//     }

//     await produto.update({
//       nome,
//       descricao,
//       preco,
//       estoque,
//       imagem,
//       unidade
//     });

//     res.json({
//       ...produto.toJSON(),
//       imagem: produto.imagem ? `${baseUrl}/${produto.imagem.replace(/\\/g, "/")}` : null
//     });

//   } catch (error) {
//     res.status(500).json({ erro: "Erro ao atualizar produto" });
//   }
// });




















// 🔹 DELETAR PRODUTO
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findOne({
      where: {
        id,
        usuario_id: req.userId
      }
    });

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    await produto.destroy();

    res.json({ mensagem: "Produto deletado com sucesso" });

  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
});

module.exports = router;
