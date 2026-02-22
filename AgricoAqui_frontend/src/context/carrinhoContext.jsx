import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

  const [busca, setBusca] = useState("");

  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  


  return (
    <CarrinhoContext.Provider 
      value={{ carrinho, setCarrinho, busca, setBusca }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
