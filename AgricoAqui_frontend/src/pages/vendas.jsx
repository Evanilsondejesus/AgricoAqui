import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";
import axios from "axios";
import Card from "../components/card";


export default function produtoUsuario() {
  const [produtos, setProdutos] = useState([]);
  //const [busca, setBusca] = useState([])
  
 const {  busca, setBusca } = useCarrinho();
  

  const navigate = useNavigate();

  useEffect(() => {
    buscarProdutos();
  }, []);
 

  useEffect(() => {
    return () => {
      setBusca("");
    };
  }, []);

 
 

async function buscarProdutos() {
  try {
    const response = await axios.get(
      "http://localhost:3000/produtos/produto_user",
      {
        withCredentials: true
      }
    );

    setProdutos(response.data);

  } catch (error) {

    if (error.response?.status === 401) {
      navigate("/login");
      return;
    }

    console.log("Erro ao buscar produtos", error);
  }

}

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );


async function removerProduto(id) {
  try {
    await axios.delete(
      `http://localhost:3000/produtos/${id}`,
      {
        withCredentials: true
      }
    );

    // Atualiza lista removendo do estado
    setProdutos((prev) =>
      prev.filter((produto) => produto.id !== id)
    );

  } catch (error) {
    console.log("Erro ao remover produto", error);
  }
}




















  return (
    <>
    
      {/* ÁREA PRINCIPAL */}
    
  <meta name="title" content="Vendas Agrícolas | AgricoAqui" />
  <meta name="description" content="Explore produtos agrícolas disponíveis para venda no AgricoAqui. Conecte-se diretamente com produtores rurais e faça negócios de forma segura e eficiente." />
  <meta name="keywords" content="vendas agrícolas, comprar produtos rurais, mercado agrícola, agronegócio, produtores rurais" />
  <meta name="author" content="AgricoAqui" />
  <meta name="robots" content="index, follow" />
  <title>Vendas Agrícolas | AgricoAqui</title>
    
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#bfcab0", minHeight: "100vh" }}
      >
  
        <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Histórico de compras</h2>
        </div>
 






<button
      onClick={() => navigate("/cadastra-produto")}
      className="btn d-flex align-items-center justify-content-center"
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: "#ff5e5e",
        color: "white",
        fontSize: "30px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        border: "none",
        transition: "0.3s"
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      +
    </button>
 
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
{/* 
                    <div
                      className="bg-secondary rounded-top"
                      style={{ height: "150px" }}
                    ></div> */}

                    <div className="card-body text-center">
                      <h6 className="fw-bold">
                        {produto.nome}
                      </h6>

                      <p className="text-muted small">
                        R$ {produto.preco}
                      </p>

                      <button className="btn btn-danger btn-sm" onClick={() => removerProduto(produto.id)}>
                        remover
                      </button>
 

                      <a href={`/atualiza-produto/${produto.id}`} className="btn btn-primary btn-sm ms-2">
                        Atualizar
                      </a>

                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-dark">
                Nenhum produto encontrado
              </p>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

