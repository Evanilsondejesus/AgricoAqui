import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/carrinhoContext";

import { useEffect } from "react";


export default function Navbar() {
  const navigate = useNavigate();
  const { carrinho,busca , setBusca} = useCarrinho();


  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold fs-4 text-success"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          AgroAqui
        </span>

        {/* Botão Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Busca */}
          <form
            className="d-flex mx-auto w-50"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </form>

          {/* Links */}
          <div className="d-flex align-items-center gap-4">

            {/* <NavLink
              to="/comprar"
              className="text-decoration-none text-dark fw-semibold"
            >
              Minhas Compras
            </NavLink> */}


<NavLink
  to="/home"
  className={({ isActive }) =>
    isActive
      ? "text-success fw-bold text-decoration-none border-bottom border-2 border-success pb-1"
      : "text-dark text-decoration-none"
  }
>
  Home
</NavLink>


<NavLink
  to="/minhas-compras"
  className={({ isActive }) =>
    isActive
      ? "text-success fw-bold text-decoration-none border-bottom border-2 border-success pb-1"
      : "text-dark text-decoration-none"
  }
>
  Minhas compras
</NavLink>




            {/* <NavLink
              to="/vendas"
              className="text-decoration-none text-dark fw-semibold"
            >
              Vender
            </NavLink> */}

<NavLink
  to="/vendas"
  className={({ isActive }) =>
    isActive
      ? "text-success fw-bold text-decoration-none border-bottom border-2 border-success pb-1"
      : "text-dark text-decoration-none"
  }
>
  Vender
</NavLink>






<NavLink
  to="/carrinho-de-compras"
  title="Ver carrinho"
  className={({ isActive }) =>
    isActive
      ? "cart-container me-3 position-relative text-success"
      : "cart-container me-3 position-relative text-dark"
  }
>
  {({ isActive }) => (
    <>
      <i
        className={`bi ${isActive ? "bi-cart-fill" : "bi-cart"} fs-4`}
      ></i>

      <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
        
{totalItens}
      </span>
    </>
  )}
</NavLink>




          </div>
        </div>
      </div>
    </nav>
  );
}
