import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";
import Card from "../components/card";
import axios from "axios";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true); // estado de loading
  const [erro, setErro] = useState(null);       // estado de erro
  const { setCarrinho, busca } = useCarrinho();
  const navigate = useNavigate();

  // Evita erro caso produto.nome seja undefined
  const produtosFiltrados = produtos.filter((produto) =>
    produto?.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    setLoading(true);
    setErro(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/produtos/listar",
        { withCredentials: true }
      );

      setProdutos(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }

      console.log("Erro ao buscar produtos", error);
      setErro("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  function adicionarAoCarrinho(produto) {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(p => p.id === produto.id);

      if (produtoExistente) {
        return prevCarrinho.map(p =>
          p.id === produto.id
            ? { ...p, quantidade: (p.quantidade || 1) + 1 }
            : p
        );
      }

      return [...prevCarrinho, { ...produto, quantidade: 1 }];
    });
  }

  return (
    <>

<title>AgricoAqui | Conectando produtores e compradores</title>

  <meta name="title" content="AgricoAqui | Conectando produtores e compradores" />
  <meta name="description" content="O AgricoAqui é uma plataforma digital que conecta produtores rurais e compradores de forma simples, moderna e eficiente, fortalecendo o mercado agrícola." />
  <meta name="keywords" content="agricultura, produtores rurais, mercado agrícola, agronegócio, vendas agrícolas, plataforma agrícola, conexão rural" />
  <meta name="author" content="AgricoAqui" />

  
  <meta name="robots" content="index, follow" />


    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#bfcab0", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row g-4 justify-content-center">

          {loading && (
            <div className="text-center text-dark">
              <p>Carregando produtos...</p>
            </div>
          )}

          {erro && !loading && (
            <div className="text-center">
              <p className="text-danger">{erro}</p>
              <button
                className="btn btn-warning"
                onClick={buscarProdutos} // refaz a requisição
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !erro && produtosFiltrados.length === 0 && (
            <p className="text-center text-dark">Nenhum produto encontrado</p>
          )}

          {!loading && !erro && produtosFiltrados.map((produto) => (
            <Card
              key={produto.id}
              imagem={produto.imagem}
              nome={produto.nome}
              preco={produto.preco}
              mostrarBotao={!produto.meuProduto}
              onClickBotao={() => adicionarAoCarrinho(produto)}
            />
          ))}

        </div>
      </div>
    </div>




</>
  );
}
