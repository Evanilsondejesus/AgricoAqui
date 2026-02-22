import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import BemVindo from "./pages/bemVindo";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
  
 <Route path="*" element={<NotFound />} /> {/* Qual outra rota que usuario possa inventar ou digitar por engando uma rota que não existir */}
 <Route path="/bem-vindo" element={<BemVindo />} />
 <Route path="cadastro" element={<Cadastro />} />
<Route path="login" element={<Login />} />
            </Routes>
            
      </BrowserRouter>


    </>
  )
}

export default App
