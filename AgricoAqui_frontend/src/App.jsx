import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import BemVindo from "./pages/bemVindo";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
import Layout from "./layout/layout";
import Home from "./pages/home";
import { CarrinhoProvider } from "./context/carrinhoContext";
import Venda from "./pages/vendas";
import CadastraProduto from "./pages/cadastraProduto";
import AtualizaProduto from "./pages/atualizaProduto";
import HistoricoCompra from "./pages/historicoCompra";
import CarrinhoCompras from "./pages/carrinhoCompras";












function App() {
  

  return (
    <>
     <CarrinhoProvider>
       <BrowserRouter>
        <Routes>
  
 <Route path="*" element={<NotFound />} /> {/* Qual outra rota que usuario possa inventar ou digitar por engando uma rota que não existir */}
 <Route path="/bem-vindo" element={<BemVindo />} />
 <Route path="cadastro" element={<Cadastro />} />
<Route path="login" element={<Login />} />
  <Route  element={<Layout />}>
     <Route path="home" element={<Home />} />
     <Route path="vendas" element={<Venda />} />
     <Route path="cadastra-produto" element={<CadastraProduto />} />
     <Route path="atualiza-produto/:id" element={<AtualizaProduto />} />
     <Route path="minhas-compras" element={<HistoricoCompra />} />
    <Route path="carrinho-de-compras" element={<CarrinhoCompras />} />
  
  </Route>




        </Routes>
            
      </BrowserRouter>
    </CarrinhoProvider>

    </>
  )
}

export default App
