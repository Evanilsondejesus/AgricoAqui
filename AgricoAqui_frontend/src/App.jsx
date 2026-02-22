import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import BemVindo from "./pages/bemVindo";
import Cadastro from "./pages/cadastro";

function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
  
 <Route path="*" element={<NotFound />} /> {/* Qual outra rota que usuario possa inventar ou digitar por engando uma rota que não existir */}
 <Route path="/bem-vindo" element={<BemVindo />} />
 <Route path="cadastro" element={<Cadastro />} />
            </Routes>
            
      </BrowserRouter>


    </>
  )
}

export default App
