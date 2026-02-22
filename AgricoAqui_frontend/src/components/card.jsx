
  
// export default function Card() {
//   return (
//     <div className="card" style={{ width: "18rem" }}>
//       <img src="..." className="card-img-top" alt="..." />
//       <div className="card-body">
//         <p className="card-text">
//           Some quick example text to build on the card title and make up the bulk of the card’s content.
//         </p>
//       </div>
//     </div>
//   );
// }



 



// Card.jsx
export default function Card({ nome, preco, imagem, key, descricao, mostrarBotao, onClickBotao }) {
  return (

<div key={key} className="col-6 col-md-3" >
    <div className="card" style={{ width: "18rem" }}>
      {imagem && <img src={imagem} className="card-img-top" alt={descricao} />}
      <div className="card-body">
        <h5 className="card-title">{nome}</h5>
        <p className="card-text">$ {preco}</p>

        {mostrarBotao && (
          <button className="btn btn-primary" onClick={onClickBotao} >
            Adicionar ao carrinho
          </button>
        )}
      </div>
    </div>








</div>




    








  );
}
