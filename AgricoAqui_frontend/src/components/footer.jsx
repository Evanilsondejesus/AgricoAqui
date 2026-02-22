
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCarrinho } from "../context/carrinhoContext";






function Footer() {
  
const navigate = useNavigate();
const {setCarrinho } = useCarrinho();


async function Logout() {
  try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include" // importante se usar cookie
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer logout");
    }
setCarrinho([])
    // 🔥 Limpa apenas o carrinho
    localStorage.removeItem("carrinho");
    navigate("/bem-vindo");
    console.log("passou")

  } catch (error) {
    console.error("Erro:", error);
  }
}



  return (
    <footer className="bg-dark text-white pt-5 pb-3">
  <div className="container">
    <div className="row">

      {/* Seção sobre */}
      <div className="col-md-4 mb-3">
        <h5>Sobre Nós</h5>
        <p className="small">
          Somos uma plataforma dedicada a conectar agricultores locais com consumidores, promovendo a agricultura sustentável e o comércio justo. Nossa missão é facilitar o acesso a produtos frescos e de qualidade, enquanto apoiamos os produtores locais.
        </p>
      </div>

      {/* Seção links rápidos */}


      <div className="col-md-4 mb-3">
        <h5>Links Rápidos</h5>
         

<ul className="list-unstyled">
  <li>
    <a href="/home" className="text-white text-decoration-none">Home</a>
  </li>
  <li>
    <a href="/produtos" className="text-white text-decoration-none">Produtos</a>

  </li>
  <li>
    <button 
      className="btn btn-link p-0 text-white text-decoration-none" 
      onClick={Logout}
    >
      Logout
    </button>
  </li>
</ul>





























      </div>

      {/* Seção redes sociais */}
      <div className="col-md-4 mb-3">
        <h5>Siga-nos</h5>
<div className="d-flex gap-2">
  <a href="#" className="btn btn-outline-light rounded-circle text-decoration-none">
    <i className="bi bi-facebook fs-4"></i>
  </a>

  <a href="#" className="btn btn-outline-light rounded-circle">
    <i className="bi bi-whatsapp fs-4"></i>
  </a>

  <a href="#" className="btn btn-outline-light rounded-circle">
    <i className="bi bi-twitter-x fs-4"></i>
  </a>
</div>



 





      </div>

    </div>

    <hr className="border-light" />

    <div className="text-center small">
      &copy; {new Date().getFullYear()} AgricoAqui. Todos os direitos reservados.
    </div>
  </div>
</footer>

  );
}

export default Footer;
