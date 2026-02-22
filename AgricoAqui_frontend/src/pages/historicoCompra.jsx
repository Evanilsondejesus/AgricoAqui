import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function HistoricoCompras() {
  const [produtos, setProdutos] = useState([]);
  //const [busca, setBusca] = useState("");
  
     const { busca, setBusca } = useCarrinho();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  const navigate = useNavigate();
 
  
  useEffect(() => {
    return () => {
      setBusca("");
    };
  }, []);



const buscarProdutos = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await axios.get(
      `${API_URL}/compras/produto_comprado`,
      {
        withCredentials: true
      }
    );

    setProdutos(response.data);

  } catch (err) {

    if (err.response?.status === 401) {
      navigate("/login");
      return;
    }

    setError("Não foi possível carregar os produtos.");
    console.error(err);

  } finally {
    setLoading(false);
  }
}, [navigate]);



  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);




  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);



 
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#bfcab0", minHeight: "100vh" }}
    >
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Histórico de compras</h2>
        </div>

        {loading && (
          <p className="text-center">Carregando produtos...</p>
        )}

        {error && (
          <p className="text-center text-danger">{error}</p>
        )}

        {!loading && !error && (
          <div className="row g-4 justify-content-center">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <div key={produto.id} className="col-6 col-md-3">
                  <div className="card shadow-sm border-0 rounded-3 h-100">

                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />

                    <div className="card-body text-center">
                      <h6 className="fw-bold">
                        {produto.nome}
                      </h6>

                      <p className="text-muted small">
                        R$ {Number(produto.preco).toFixed(2)}
                      </p>

                      <Link
                        to={`/atualizaProduto/${produto.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Comprar novamente
                      </Link>

                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-dark">
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
