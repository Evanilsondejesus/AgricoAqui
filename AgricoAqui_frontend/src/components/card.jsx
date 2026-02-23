



 




export default function Card({ nome, preco, imagem, id, descricao,  btnInfo }) {
  return (

<div key={id} className="col-md-4 col-lg-3 d-flex      col-6 col-md-3" >
    <div className="card" style={{ width: "18rem" }}>
      {imagem && <img src={imagem} className="card-img-top" alt={descricao} />}
      <div className="card-body">
        <h5 className="card-title">{nome}</h5>
        <p className="card-text">$ {preco}</p>
        <a href={`produto/`+id} className="btn-primary text-decoration-none">{btnInfo}</a>

  
      </div>
    </div>



</div>


  );
}













 