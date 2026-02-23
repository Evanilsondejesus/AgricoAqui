import { Link } from "react-router-dom";
import imagem404 from "../assets/deu_ruim.png"; // coloque sua imagem aqui

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">

      <img
        src={imagem404}
        alt="Página não encontrada"
        className="img-fluid mb-4"
        style={{ maxWidth: "350px" }}
      />

      <h1 className="display-4 fw-bold">404</h1>
      <h2 className="mb-3">Página não encontrada</h2>

      <p className="text-muted mb-4">
        A rota que você tentou acessar não existe.
      </p>

      <Link to="/" className="btn-primary btn-lg">
        Voltar para página inicial
      </Link>

    </div>
  );
}
