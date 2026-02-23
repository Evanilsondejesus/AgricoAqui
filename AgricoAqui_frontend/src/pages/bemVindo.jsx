import { Link } from "react-router-dom";
import agricultor from "../assets/agricultor.png";
import agricultorCarrinho from "../assets/agricultor_com_carro_de_mao.png";
import "../styles/Welcome.css";




function Welcome() {
  return (
    <>
    
    


      <header className="header">
        <div className="logo">🌱 AgricoAqui</div>

        <nav>
          <Link to="/login" className="btn-outline text-decoration-none">Entrar</Link>
          <Link to="/cadastro" className="btn-primary text-decoration-none">Criar conta</Link>
        </nav>
        <meta name="title" content="AgricoAqui | Conectando produtores e compradores" />
        <meta name="description" content="O AgricoAqui é uma plataforma digital que conecta produtores rurais e compradores de forma simples, moderna e eficiente." />
        <meta name="keywords" content="agricultura, produtores rurais, mercado agrícola, agronegócio, vendas agrícolas, plataforma agrícola" />
        <meta name="author" content="AgricoAqui" />
        <meta name="robots" content="index, follow" />
    
      </header>
    <title>AgricoAqui | bem vindo</title>


      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img src={agricultor} alt="Agricultor local" />
          </div>

          <div className="hero-text neblina">
            <h1>Conectando você<br />direto ao produtor local</h1>
            <p>
              Compre, venda ou troque produtos frescos,
              saudáveis e produzidos na sua região —
              sem intermediários.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary">Começar agora</button>
              <button className="btn-secondary">Ver como funciona</button>
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <h2>Conheça o produtos</h2>
        <p className="subtitle">Tudo direto do produtor, sem atravessadores.</p>

        <div className="cards">
          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2017/12/11/17/29/potatoes-3012769_1280.jpg" />
            <span>Batatas frescas</span>
          </div>

          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_1280.jpg" />
            <span>Tomates orgânicos</span>
          </div>

          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2017/02/08/11/15/egg-2048476_1280.jpg" />
            <span>Ovos caipiras</span>
          </div>

          <div className="card">
            <img src="https://cdn.pixabay.com/photo/2014/04/16/09/58/banana-325461_1280.jpg" />
            <span>Bananas</span>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="benefits-text">
          <h2>Por que usar o AgricoAqui?</h2>
          <ul>
            <li>✔ Taxas mais baixas</li>
            <li>✔ Menor custo de transporte</li>
            <li>✔ Produtos mais frescos</li>
            <li>✔ Incentivo à agricultura local</li>
            <li>✔ Preços mais justos</li>
            <li>✔ Comunidade colaborativa</li>
          </ul>
        </div>

        <div className="benefits-image">
          <img src={agricultorCarrinho} alt="Agricultor com carrinho" />
        </div>
      </section>

      <section className="cta">
        <h2>Faça parte dessa rede local</h2>
        <p>
          Comece hoje a comprar, vender ou trocar
          produtos agrícolas na sua região.
        </p>

        <div className="cta-buttons">
          <Link to="/cadastro" className="btn-primary text-decoration-none">
            Criar conta gratuita
          </Link>

          <Link to="/login" className="btn-outline text-decoration-none">
            Entrar
          </Link>
        </div>
      </section>

      <footer className="footer">
        <a href="#">Como comprar</a>
        <a href="#">Como vender</a>
        <a href="#">Taxas e tarifas</a>
        <a href="#">Fale conosco</a>
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
      </footer>



      
    
    </>
  );
}

export default Welcome;
