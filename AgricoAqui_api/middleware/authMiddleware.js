

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // pega token do cookie

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // salva ID do usuário
    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;
