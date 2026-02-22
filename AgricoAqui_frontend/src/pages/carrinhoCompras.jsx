import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";
import axios from "axios";

export default function CarrinhoCompras() {
  const navigate = useNavigate();
  const { carrinho, setCarrinho } = useCarrinho();

  function aumentarQuantidade(id) {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
  }

  function removerItem(id) {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  }

  async function finalizarCompra() {
    console.log("Finalizando compra com itens:", carrinho);

    try {
      const response = await axios.post(
        "http://localhost:3000/compras/finalizar",
        { itens: carrinho },
        { withCredentials: true } // envia cookies
      );

      alert("Compra finalizada com sucesso!");
      localStorage.removeItem("carrinho");
      setCarrinho([]);
      navigate("/home");

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        alert(error.response?.data?.erro || "Erro no servidor");
      }
    }
  }

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (

    <>
    <title>Carrinho de Compras | AgricoAqui</title>

  <meta name="title" content="Carrinho de Compras | AgricoAqui" />
  <meta name="description" content="Revise os produtos selecionados no seu carrinho e finalize sua compra no AgricoAqui de forma rápida e segura." />
  <meta name="keywords" content="carrinho agrícola, finalizar compra, marketplace agrícola, agronegócio" />
  <meta name="author" content="AgricoAqui" />
  <meta name="robots" content="noindex, nofollow" />
    
    
    
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#bfcab0", minHeight: "100vh" }}
    >
      <div className="container">
        <h3 className="mb-4 fw-bold">Meu Carrinho</h3>

        {carrinho.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">Seu carrinho está vazio</p>
            <button className="btn btn-danger" onClick={() => navigate("/home")}>
              Voltar para loja
            </button>
          </div>
        ) : (
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              {carrinho.map(item => (
                <div key={item.id} className="row align-items-center border-bottom py-3">
                  <div className="col-md-4">
                    <h6 className="fw-bold">{item.nome}</h6>
                    <small className="text-muted">R$ {item.preco}</small>
                  </div>

                  <div className="col-md-3 d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => diminuirQuantidade(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantidade}</span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => aumentarQuantidade(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-3">
                    <strong>R$ {(item.preco * item.quantidade).toFixed(2)}</strong>
                  </div>

                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removerItem(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-end mt-4">
                <h5>Total: R$ {total.toFixed(2)}</h5>
                <button className="btn btn-success mt-3" onClick={finalizarCompra}>
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
    </>
  );
}
