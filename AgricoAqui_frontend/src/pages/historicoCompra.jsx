import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";
import axios from "axios";
import Card from "../components/card";
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

    <>


  <meta name="title" content="Histórico de Compras | AgricoAqui" />
  <meta name="description" content="Acompanhe suas compras realizadas no AgricoAqui e visualize detalhes dos seus pedidos de forma organizada e segura." />
  <meta name="keywords" content="histórico de compras, pedidos agrícolas, compras realizadas, plataforma agrícola" />
  <meta name="author" content="AgricoAqui" />
  <meta name="robots" content="noindex, nofollow" />

<title>Histórico de Compras | AgricoAqui</title>


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
          <p className="text-center">{error}</p>
        )}

        {!loading && !error && (
          <div className="row g-4 justify-content-center">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (


            <Card
              key={produto.id}
              imagem={produto.imagem}
              nome={produto.nome}
              preco={produto.preco}
              mostrarBotao={!produto.meuProduto}
              onClickBotao={() => adicionarAoCarrinho(produto)}
            />



              







                

                      
              
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
    </>
  );
}
