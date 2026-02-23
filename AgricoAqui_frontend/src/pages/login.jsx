import { useState } from "react";
import { useNavigate } from "react-router-dom";
import agricultorImg from "../assets/agricultor.png";
import Alerta from "../components/alert";
import useAlerta from "../hooks/useAlert";
import axios from "axios";
import Footer from "../components/footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { alerta, notify, close } = useAlerta();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, senha },
        { withCredentials: true }
      );

      notify(response.data.mensagem, "success");
      localStorage.removeItem("carrinho");

     // navigate("/home");
      
    setTimeout(() => {
      navigate("/home");
    }, 3000);

    } catch (error) {
      if (error.response) {
        notify(
          error.response.data?.erro || "Credenciais inválidas",
          "danger"
        );

 

      } else {
        notify("Erro no servidor. Tente novamente.", "danger");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

    <header>

<meta name="title" content="Entrar | AgricoAqui" />
  <meta name="description" content="Acesse sua conta no AgricoAqui e conecte-se ao mercado agrícola digital." />
  <meta name="keywords" content="login AgricoAqui, acesso produtor, mercado agrícola, agronegócio" />
  <meta name="author" content="AgricoAqui" />
  <meta name="robots" content="noindex, nofollow" />
</header>

    <title>AgricoAqui | Entrar</title>
  <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{ backgroundColor: "#cfd8c3" }}
      >
        <div
          className="container bg-white rounded-4 shadow overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="row g-0">

            {/* LADO ESQUERDO */}
            <div
              className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#bfcab0" }}
            >
              <img
                src={agricultorImg}
                alt="Agricultor"
                className="img-fluid"
                style={{ maxHeight: "400px" }}
              />
            </div>

            {/* LADO DIREITO */}
            <div className="col-md-6 p-5 bg-light">

              <h2 className="fw-bold text-success mb-2">
                🌱 AgricoAqui
              </h2>

              <p className="text-muted mb-4">
                Entre e conecte-se direto ao produtor local
              </p>

              {/* 🔔 ALERTA NO LOCAL PROFISSIONAL */}
              {alerta.show && (
                <Alerta
                  message={alerta.message}
                  type={alerta.type}
                  show={alerta.show}
                  onClose={close}
                />
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-3"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Senha</label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-3"
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className=" rounded-3 btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                </div>

                <div className="text-center mb-4">
                  <a href="#" className="text-success text-decoration-none">
                    Esqueci minha senha
                  </a>
                </div>

                <hr />

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Ainda não tem conta?
                  </span>{" "}
                  <span

                    className="text-success fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cadastro")}
                  >
                    Criar conta gratuita
                  </span>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
<Footer/>
    </>
  );
}
