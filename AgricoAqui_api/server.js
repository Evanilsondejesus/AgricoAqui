const express = require("express");
const createDatabaseIfNotExists = require("./config/dbSetup");
const authRoutes = require("./routes/auth");
const produtoRoutes = require("./routes/produto"); 
const produtosCompradosRoutes = require("./routes/compras");
const sequelize = require("./config/sequelize");
//const { swaggerUi, specs } = require("./config/swagger");



const cookieParser = require("cookie-parser");
const cors = require("cors");



require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // URL do seu frontend
  credentials: true               // 🔑 permite enviar cookies
}));

app.use("/uploads", express.static("uploads"));


 

(async () => {

  try {
  await createDatabaseIfNotExists();
  await sequelize.sync(); // cria tabelas se não existirem
  
  app.use(authRoutes);
  app.use("/produtos", produtoRoutes);
  app.use("/compras", produtosCompradosRoutes);
  




  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });



  } catch (error) {


 switch (error.code) {
    case "ECONNREFUSED":
      console.error("❌ Não foi possível conectar ao MySQL");
      break;

    case "ER_ACCESS_DENIED_ERROR":
      console.error("❌ Usuário ou senha inválidos");
      break;

    case "ETIMEDOUT":
      console.error("❌ Tempo de conexão esgotado");
      break;

    default:
      console.error("❌ Erro desconhecido:", error.message);
  }

  return {
    success: false,
    code: error.code,
    message: error.message
  };

    
  }




  
})();




















