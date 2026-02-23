import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCarrinho } from "../context/carrinhoContext";
 //const { setCarrinho, busca } = useCarrinho();


export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const {setCarrinho, busca} = useCarrinho()

  useEffect(() => {
    buscarProduto();
  }, []);

  async function buscarProduto() {
    try {
      const response = await axios.get(
        `http://localhost:3000/produtos/${id}`,
        { withCredentials: true }
      );

      setProduto(response.data);
    } catch (error) {
      console.log("Erro ao buscar produto", error);
    }
  }



  if (!produto) return <p className="text-center mt-5">Carregando...</p>;



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
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#bfcab0", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="card mx-auto" style={{ maxWidth: "600px" }}>
          <img
            src={produto.imagem}
            className="card-img-top"
            alt={produto.nome}
          />

          <div className="card-body">

            <h3>{produto.nome}</h3>
            <p className="text-muted">R$ {produto.preco}</p>

{!produto.meuProduto ? (
  <button className="btn btn-primary" onClick={()=> adicionarAoCarrinho(produto)}>
    Comprar
  </button>
) : (
  <span className="badge bg-secondary">
    Seu próprio produto
  </span>
)}




            <p>
              {produto.descricao}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
