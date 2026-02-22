import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";


function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
  
{/* Qual outra rota que usuario possa inventar ou digitar por engando uma rota que não existir */}
 <Route path="*" element={<NotFound />} /> 
            </Routes>
            
      </BrowserRouter>


    </>
  )
}

export default App
