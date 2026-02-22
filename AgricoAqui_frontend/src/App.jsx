import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import BemVindo from "./pages/bemVindo";

function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
  
{/* Qual outra rota que usuario possa inventar ou digitar por engando uma rota que não existir */}
 <Route path="*" element={<NotFound />} /> 
  <Route path="/bem-vindo" element={<BemVindo />} />
            </Routes>
            
      </BrowserRouter>


    </>
  )
}

export default App
