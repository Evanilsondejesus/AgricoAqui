const mysql = require("mysql2/promise");

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    port: 3306
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS agricoaqui"
  );

  console.log("✅ Banco de dados verificado/criado");

  await connection.end();
}

module.exports = createDatabaseIfNotExists;
