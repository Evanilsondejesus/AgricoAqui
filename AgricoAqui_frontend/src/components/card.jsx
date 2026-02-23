



 




// export default function Card({ nome, preco, imagem, key, descricao, mostrarBotao, onClickBotao }) {
//   return (

// <div key={key} className="col-6 col-md-3" >
//     <div className="card" style={{ width: "18rem" }}>
//       {imagem && <img src={imagem} className="card-img-top" alt={descricao} />}
//       <div className="card-body">
//         <h5 className="card-title">{nome}</h5>
//         <p className="card-text">$ {preco}</p>

//         {mostrarBotao && (
//           <button className="btn btn-primary" onClick={onClickBotao} >
//             Adicionar ao carrinho
//           </button>
//         )}
//       </div>
//     </div>



// </div>


//   );
// }




















export default function Card({ imagem, nome, preco, mostrarBotao, onClickBotao }) {
  return (
    <div className="col-md-4 col-lg-3 d-flex">
      <div className="card h-100 w-100 shadow-sm">

        <div className="image-container">
          <img src={imagem} className="card-img-top img-padronizada" alt={nome} />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nome}</h5>
          <p className="card-text fw-bold">R$ {preco}</p>

          {mostrarBotao && (
            <button
              className="btn-primary mt-auto"
              onClick={onClickBotao}
            >
              Adicionar ao carrinho
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
